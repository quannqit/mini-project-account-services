# account-services

## Installation

```bash
$ yarn install
```

## Requirements

- NestJS cli

  ```bash
  npm install -g @nestjs/cli
  ```

## Start dependency services

```bash
docker stack deploy -c docker-compose.yml account_services
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Development

```bash
# Create new module
$ nest g module <name>

# Create new service
$ nest g service <name>

# Create new controller
$ nest g controller <name>
```

## DB Migration

```bash
# Generate migration from entities
$ yarn typeorm migration:generate -n [migration-name]

# Run migrations
$ yarn typeorm migration:run

# Revert migration
$ yarn typeorm migration:revert

```
