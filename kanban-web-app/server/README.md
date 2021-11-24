# kanban-web-app : server

## Important
There are two key requirements before running the below or batch files:

- This requires the latest version of NodeJS version 12 or above to run. <br /> You can download it from their offical page: https://nodejs.org/en/download/. <br />
Anything below will fail as [whatwg-url](https://www.npmjs.com/package/whatwg-url) (a popular package this uses) uses node APIs that were introduced in v12.

- This also requires a localhost MongoDB server to be set up without any authentication. <br /> You can find instructions on how to do so using their documentation here: https://docs.mongodb.com/guides/server/install/.


## Project Setup
```
npm install
```

### Compiles & Runs the server
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```


### Runs server through the latest built code
```
npm run start
```
