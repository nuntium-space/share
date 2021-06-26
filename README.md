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

### Serve locally

This will start a local server on `http://localhost:4001`.

```
npm start
```

[nuntium]: https://github.com/nuntium-space/nuntium
[open-graph]: https://ogp.me
