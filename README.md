# nuntium-share

This repo contains files used by [nuntium][nuntium] to create share links that load pages with the shared article's metadata with these formats:
- [`Open Graph`][open-graph]

This allows apps, like social networks, to display to the user some details (title, link and others) in a card within the website / app.

## Test

### Set environment variables

```
NODE_ENV=development
PORT=4001


CLIENT_URL=http://localhost:4200


DATABASE_URL=postgresql://{{ USER }}:{{ PASSWORD }}@{{ HOST }}:{{ PORT }}/{{ NAME }}?schema={{ SCHEMA }}
```

***Note:** `HOST` must be an IP address, and `not localhost`, because when running on the local lambda emulator the function will be in a Docker container, and so it won't have access to the host's network.*

### Serve locally

This will start a local server on `http://localhost:4001`.

```
npm start
```

### Deploy to localstack

#### Install [act][act]

See [here](https://github.com/nektos/act#installation).

#### Deploy

Run

```
act
```

[act]: https://github.com/nektos/act
[nuntium]: https://github.com/nuntium-space/nuntium
[open-graph]: https://ogp.me
