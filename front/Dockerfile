FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_API_PROXY_TARGET
ARG NEXT_PUBLIC_FRONT_URL
ENV NEXT_PUBLIC_API_PROXY_TARGET=$NEXT_PUBLIC_API_PROXY_TARGET
ENV NEXT_PUBLIC_FRONT_URL=$NEXT_PUBLIC_FRONT_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
