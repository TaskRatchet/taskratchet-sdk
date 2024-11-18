# taskratchet-sdk

## Installation

```sh
npm install @taskratchet/sdk
```

## Development

### Publish to NPM

```sh
# Update version in package.json, then:
npm run publish
```

## Todo

- Rename getCheckoutSession to createCheckoutSession
- Rename getApiToken to createApiToken
- Switch from fetch1 to fetch2 where possible
- Add better types for all functions
- Handle pagination when using fetch2
- Update fetch2 to send API token using ApiKey-v2 header
- Replace window.localStorage with something that will work in the browser and in Node
- Create CI workflow
- Add master branch protections
