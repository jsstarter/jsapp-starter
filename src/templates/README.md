# {{it.projectDir}}

![node](http://img.shields.io/badge/node-16+-brightgreen.svg)
![npm](http://img.shields.io/badge/npm-8+-orange.svg)

You Project description Here.

## Perquisites
- node.js 16+
- npm 8+

## Features
Your Project Features
- Landing Page.
- Display Cats in a Grid

## Usage
- Install npm packages.
```shell script
$ npm install
```
{{ @if (it.subProject === 'server' || it.subProject === '') }}
- Start the Server
{{ /if }}
{{ @if (it.subProject === 'server') }}
```shell script
$ npm start
```
{{ #elif (it.subProject === '') }}
```shell script
$ npm start --workspace=server
```
{{/if}}
{{ @if (it.subProject === 'client' || it.subProject === '') }}
- Start the Client
{{ /if }}
{{ @if (it.subProject === 'client') }}
```shell script
$ npm start
```
{{ #elif (it.subProject === '') }}
```shell script
$ npm start --workspace=client
```
{{ /if }}
{{ @if (it.subProject === 'client' || it.subProject === '') }}
- Client deployed at [http://localhost:3000](http://localhost:3000) by default.
{{ /if }}
{{ @if (it.subProject === 'client') }}
- Current Configured API server http://localhost:9000 may not exist. 
So change application code to get data from appropriate API or Setup express server project.
{{ /if }}
{{ @if (it.subProject === 'server' || it.subProject === '') }}
- Server deployed at [http://localhost:9000](http://localhost:9000) by default.
{{ /if }}

{{ @if (it.subProject === '' }}
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
{{ /if }}

## Building project
{{ @if (it.subProject === 'server' || it.subProject === '') }}
- To build server for production run
{{ /if }}
{{ @if (it.subProject === 'server') }}
```shell script
$ npm run build
```
{{ #elif (it.subProject === '') }}
```shell script
$ npm run build --workspace=server
```
{{ /if }}
{{ @if (it.subProject === 'client' || it.subProject === '') }}
- To build client for production, that deploys on a specific domain
{{ /if }}
{{ @if (it.subProject === 'client') }}
```shell script
$ PUBLIC_URL=https:<domain>/<path> npm run build
```
{{ #elif (it.subProject === '') }}
```shell script
$ PUBLIC_URL=https:<domain>/<path> npm run build --workspace=client
```
{{ /if }}

{{ @if (it.subProject === '') }}
## Development
- To install additional packages issue 
```shell script
$ npm i <package> -w [client|server]
```
> NOTE: Do not install packages without workspace name.
{{ /if }}

## License
Your project License.
