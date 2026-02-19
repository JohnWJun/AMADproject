# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AMAD is a meditation journaling web application with a Spring Boot backend and Next.js 14 frontend. The name "AMAD" refers to daily spiritual missions users complete.

## Commands

### Backend (Spring Boot — `back/`)

```bash
# Development (H2 in-memory DB auto-initializes)
./gradlew bootRun

# With production profile (AWS RDS MySQL)
./gradlew bootRun --args='--spring.profiles.active=deploy'

# Build JAR
./gradlew build

# Run tests
./gradlew test
```

### Frontend (Next.js — `front/`)

```bash
npm install
npm run dev       # dev server at localhost:3000
npm run build     # production build
npm run lint      # ESLint
```

## Architecture

### Stack
- **Backend**: Spring Boot 2.7, Spring Security + OAuth2 (Google), JWT, Spring Data JPA (Hibernate), MySQL/H2, MapStruct, Lombok
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Recoil (with localStorage persistence)

### Backend Domain Structure

`back/src/main/java/com/amadProject/amadApp/`
- `domain/` — Five domains: `post`, `member`, `comment`, `amad` (missions), `search`. Each follows Controller → Service → Repository → Entity layering.
- `common/` — Cross-cutting concerns: JWT filter, OAuth2 handlers, global exception advice, base audit entity, and utility classes.

Profile-based config:
- Default (`application.yml`): H2 in-memory, `ddl-auto: create`
- Deploy (`application-deploy.yml`): AWS RDS MySQL, `ddl-auto: validate`

### Frontend Route Structure

`front/src/app/`
- `(beforeLogin)/` — Public routes: landing, login (`/i/flow/login`), signup, tutorial, aboutAmad
- `(afterLogin)/` — Protected routes: home, explore, search, compose/amad, myAMAD, messages, `[username]` profile, `[username]/status/[id]` post detail, admin
- `_component/` — Shared components and Recoil atom definitions

### Authentication Flow

1. Local sign-up via `POST /members/sign-up` or Google OAuth2
2. Backend issues JWT access token (120 min) + refresh token (420 min)
3. Frontend stores tokens in localStorage via Recoil persistence
4. Frontend API clients automatically retry with refreshed token on 401 responses

### Frontend API Clients

Domain-specific API files in `front/src/app/`: `PostApi.ts`, `MemberApi.ts`, `CommentApi.ts`, `AmadApi.ts`, `SearchApi.ts`. All attach Bearer tokens from Recoil state and handle token refresh transparently.

### Key API Endpoints

| Domain | Examples |
|--------|---------|
| Post | `POST /post/{email}`, `GET /post/detail/{id}`, `GET /post/all` (paginated), `POST /post/{postId}/{memberId}/like` |
| Member | `POST /members/sign-up`, `GET /members/me`, `PATCH /members/{id}` |
| Comment | `POST /{postId}/comment`, `GET /{postId}/comment` |
| Amad | `POST /amad`, `GET /amad`, `PATCH /amad/{id}` |
| Search | `GET /search` (posts and members) |

### CORS

Backend allows `localhost:3000`, `localhost:8080`, and the production domain `jxy.me`.
