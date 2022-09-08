# CSV-parser backend application

The application serves as a utility for processing requests to retrieve data from the database.

## Features

- Processing queries
- Parsing CSC files and uploading contained data to db
- Preparing reports with provided filters

This application is a demonstration of my capabilities to complete a test task.

## Tech

The application uses a number of third party packages and sources projects to work properly:

- [NestJS][nest] - one of the advanced and modern backend frameworks;
- [Mikro-ORM][orm] - quite flexible and customizable ORM which is gaining popularity;
- [MySQL][mysql] - developed by the original MySQL developers and is an improved version of it;
- [Node.js][node] - popular and growing runtime that has a large community and support;
- [Express][express] - fast node.js network app framework;
- [TypeScript][ts] - standard for modern javascript development;
- [Docker][docker] - a universal tool that allows you to virtualize any environment and run what you need inside of it

And of course the application uses GitHub for version control.

## Installation

The app requires [Node.js][node] v16+ to run.
Also it requires [Docker][docker] if you need to run `docker-compose.yml`

Run docker compose script to build the database server:

```sh
cd csv-parser
docker compose up
```

To install the dependencies use:

```sh
npm install
```

For correct work of application you need to run migrations (and seed it with data, if you need it).
To run migrations you can use:

```sh
npm run migration:up
```

To run the app use:

```sh
npm run start
```

or if you need to run it in watch mode:

```sh
npm run start:dev
```

## Development

Development is carried out in the "develop" branch and for each new feature you need to create a new branch, before pushing to "develop" you need to create a pull request.
Branches and pull requests should be named according to the git flow convention.

Examples of naming:

> branch: `feat-hvdc-8-create-be-filtration`
> pull request: `feat: HVDC-8 Create BE Filtration`

After the pull request is approved, all commits added to the feature branch must be merged, in other words, use "Squash and merge".

Before any commit and push operations please double-check the code, and even if you are following conventions run linter before committing:

```sh
npm run lint
```

#### Config and env variables

All environment variables you need to provide you can set to the `.env` file.
An example of an available variable at the moment can find in the `.env.example` file.

#### Building for source

For production release:

```sh
npm run build
```

## Docker

The app is very easy to install and deploy in a Docker container.

By default, the Docker will expose port `3000` for BE app, `8080` for Admin panel and `3306` for DB, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image, and docker compose to run the database.
Also you can modify the `docker-compose.yml` file to add the app to container.

```sh
cd csv-parser
docker build .
```

This will create the app image and pull in the necessary dependencies.
The Dockerfile is already configured, so you don't need to modify anything just plug-and-play.

Once done, the Docker image will run and map the provided ports to ones on your host.

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

or

```sh
127.0.0.1:8080
```

if you need to access to database manager.

## License

[rep1]: https://github.com/futuro-team/hvdc-map-frontend
[nest]: https://docs.nestjs.com/
[node]: https://nodejs.org/en/
[orm]: https://mikro-orm.io/docs/installation
[ts]: https://www.typescriptlang.org/
[express]: https://expressjs.com/
[mysql]: https://www.mysql.com/
[docker]: https://www.docker.com/
