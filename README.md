# generic-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Deployment

Deployment to https://vault-examples.demos.verida.io/ happens automatically on merge to `main`. See https://us-east-2.console.aws.amazon.com/amplify/home?region=us-east-2#/

Releases are automically tagged and built on pushes to `main` using a github action. Version numbers used for the tags generated automatically by increasing the patch number by one. 
