# Chatr

Chatr is front-end application for chatting about technical topics. Features including creating posts and comments, editing content, and voting on content.

Follow the instructions for starting the Readable Server (Backend) first.
Then, clone this repository and follow the Get Started instructions to start this Chatr application.

## Get Started
1. `run yarn install`
2. `npm start`


## Application Side Effects
The application uses [redux-saga](https://github.com/redux-saga/redux-saga) as Middleware to manage fetching data and other impure actions.

## Styles
The application uses sass styles sheets which are compiled to css stylesheets for the build files. Co-locate the style sheet for a component and import the component's styles. For Component Foo, `@import ./Foo.css`.

## Readable Server (Backend)
The code for the backend server for this front-end repository can be found at Udacity's starter repository called [Readable](https://github.com/udacity/reactnd-project-readable-starter)

To start the Readable API

`git clone https://github.com/udacity/reactnd-project-readable-starter`
`cd api-server`
`npm install`
`npm start`

There is no authorization for the API other than passing in a string to the Authorization Header (i.e. {Authorization: 'some_token'} in the request headers).

Details for the API can be found on the project's [README](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md)

## License

BSD License 2.0

Copyright (c) 2017, Chris Saden
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.