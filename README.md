# jsapp-starter
![node](http://img.shields.io/badge/node-16+-brightgreen.svg)
![npm](http://img.shields.io/badge/npm-8+-orange.svg)
![build](https://github.com/jsstarter/jsapp-starter/actions/workflows/npm-publish.yml/badge.svg)

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
- Create React/Express fullstack starter app.
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

## Advanced Usage
#### Development with Proxy Mode
- Here you run client with react-scripts webpack server and all the Api calls get proxied to SERVER_URL
- Start server by running `npm start --workspace=server`
- Configure `client/.env.development` and set
```
PORT=3000
PUBLIC_URL=
REACT_APP_USE_PROXY=true
REACT_APP_SERVER_URL=http://localhost:9000
```
- Start Client by running `npm start --workspace=client`
- Access application on default location [http://localhost:3000](http://localhost:3000)

#### Development in Server Mode
- Here you build the client application on a watch, and server serves the Client applicaton from build folder
- Configure `server/.env.development` and set
```
PUBLIC_PATH=../client/build
```
- Start server by running `npm start --workspace=server`
- Configure `client/.env.development` and set
```
PUBLIC_URL=http://localhost:9000
REACT_APP_USE_PROXY=false
REACT_APP_SERVER_URL=
```
- Start watch on client builds by running `npm run watch:dev:build --workspace=client`
- Access application on server's location [http://localhost:9000](http://localhost:9000)

> NOTE: Refer to Project README for additional information.

## License
[MIT License](https://github.com/jsstarter/jsstarter/blob/master/LICENSE).