# Node.js + Postgres + Redis queue + Docker Compose

Project to demonstrate running Node.js with Postgres & Redis queue using Docker Compose.

## Run everything

```sh
docker-compose up --build
```

## Test API

```sh
echo "$(curl -s http://localhost:3000/ping)"
```

## Debug

Open Chrome Developer Tools, go to Node.js debugging panel, and open `http://localhost:9229` to debug API Node.js process. Open `http://localhost:9230` for debugging worker Node.js process.
