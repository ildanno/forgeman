# Forgeman

Command-line test runner built on top of Postman/Newman

## Usage with Docker

```sh
docker run -v ~/collections:/etc/newman ildanno/new2man run your_collection.json
```

## Development

### Prerequisites

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Clone the repository

```sh
git clone https://github.com/ildanno/forgeman.git
```

Install the dependencies

```sh
docker-compose run --rm npm i
```

Run sample tests

```sh
docker-compose run --rm new2man run examples/01_simple_request/collection.json
docker-compose run --rm new2man run examples/02_multi_script/collection.json
```
