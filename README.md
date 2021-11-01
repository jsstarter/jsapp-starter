# jsapp-starter
![node](http://img.shields.io/badge/node-16+-brightgreen.svg)
![npm](http://img.shields.io/badge/npm-8+-orange.svg)

Node.js project generator for React Full stack Application.

## Perquisites
- node.js 16+
- npm 8+

## Features
- Generates React Client and Express Server subprojects.
- Uses npm workspaces to manage both subprojects.
- Uses Typescript for both server and Client
- For full features refer to [cra-express-ts-starter](https://github.com/vkkotha/cra-express-ts-starter)

## Usage
- Install npm packages.
```shell script
$ npx jsapp-starter create-app <my-app>
```
Run `npx jsapp-starter --help` or `npx jsapp-starter create-app --help` for additional options.

- Start Server
```shell script
$ cd my-app
$ npm start --workspace=server
```

- Start the Cleint
```shell script
$ cd my-app
$ npm start --workspace=client
```
- Client deployed at [http://localhost:3000](http://localhost:3000) by default.
- Server deployed at [http://localhost:9000](http://localhost:9000) by default.
- Proxy for Server Configured in client/package.json. Edit `proxy: http://localhost:9000` property if ports change.

> NOTE: Refer to Project README for additional information.

## License
[MIT License](https://github.com/jsstarter/jsstarter/blob/master/LICENSE).