# Chatr

## Get Started
1. `run yarn install`
2. `npm start`


## Application Side Effects
The application uses [redux-saga](https://github.com/redux-saga/redux-saga) as Middleware to manage fetching data and other impure actions.

## Styles
The application uses sass styles sheets which are compiled to css stylesheets for the build files. Co-locate the style sheet for a component and import the component's styles. For Component Foo, `@import ./Foo.css`.

## Server
The code for the backend server for this front-end repository can be found at Udacity's starter repository called [Readable](https://github.com/udacity/reactnd-project-readable-starter)

``
`git clone `
`cd api-server`
`npm install`
`npm start`

There is no authorization for the API other than passing in a string to the Authorization Header (i.e. {Authorization: 'some_token'} in the request headers).

Details for the API can be found on the project's [README](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md)
