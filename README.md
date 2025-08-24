# taskratchet-sdk

## Installation

```sh
npm install @taskratchet/sdk
```

## Usage

```js
import {login, getMe} from '@taskratchet/sdk';

async function main() {
  await login(process.env.TR_EMAIL, process.env.TR_PASSWORD);
  const me = await getMe();
  console.log(me);
}
```

## Development

### Publish to NPM

```sh
# Update version in package.json, then:
npm publish
```