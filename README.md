# Forgeman

Command-line test runner built on top of Postman/Newman

## Usage

### Prerequisites

- [Docker](https://docs.docker.com/)

Update your unreadable embedded as array of strings Postman test with a path to the test file in your collection.json:

```json
{
  "info": {
    "_postman_id": "postman_collection_id",
    "name": "MY_API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "HTTP GET with linked test script",
      "event": [
        {
          "listen": "prerequest",
          "script": {
            "src": "./path_to_readable_script.js",
            "type": "text/javascript"
          }
        },
        {
          "listen": "test",
          "script": {
            "src": "./path_to_readable_script.js",
            "type": "text/javascript"
          }
        }
      ]
    }
  ]
}
```

Then run:

```sh
docker run -v /path/to/your/collections:/etc/newman ildanno/forgeman run your_collection.json
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
