FROM gradle:7.6-jdk11 AS builder
WORKDIR /app
COPY . .
RUN ./gradlew bootJar -x test --no-daemon && \
    find build/libs -name '*.jar' ! -name '*plain*' -exec cp {} build/libs/app.jar \;

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=builder /app/build/libs/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=deploy", "app.jar"]
