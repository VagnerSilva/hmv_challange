# Projeto de graduação - Challange HMV Turma 15

**Execução**

- **Pré-requistos:**

  [docker-engine](https://docs.docker.com/engine/install)

  [git](https://git-scm.com/downloads)

  [java jdk](https://www.oracle.com/java/technologies/javase/jdk16-archive-downloads.html)

  [nodejs](https://nodejs.org/en/download)

  [Configurar variável de ambiente JAVA_HOME](https://fluttercorner.com/solved-error-java_home-is-not-set-and-no-java-command-could-be-found-in-your-flutter-path-in-flutter/)

  Se não tiver a [IDE INTELLIJ](https://www.jetbrains.com/pt-br/idea/download/) instalada
  [gradle](https://gradle.org/install/)

- **Comandos:**

  ```properties
  # build api

  ./fiap_hmv-api/gradlew -p fiap_hmv-api build

  ou

  cd fiap_hmv-api
  ./gradlew build

  ```

  ```properties
  # test api

  ./fiap_hmv-api/gradlew -p fiap_hmv-api test

    ou

  cd fiap_hmv-api
  ./gradlew test
  ```

```properties
# docker compose

docker-compose -p "hmv-workspace"  -f "docker-compose.yml" up -d --build
```

```properties
# test app
cd hmv_fiap
yarn install
yarn test

ou

cd hmv_fiap
npm install
npm run test
```
