# frontp
Frontp is a folder and files pattern to create webapps / projects focused fully on the client-side.


## Usage

```bash
git clone https://github.com/kazzkiq/frontp.git
cd frontp
npm install
node server.js
```
Now you can access your app by: http://127.0.0.1:8888

----

> Obs.: Alternatively to the Node.js server, you can do the first three steps into any HTTP server you have (Apache, NGINX, etc) and access your app via: http://your-local-addr:your-port/frontp/app/dist/index.html

## About LESS
The project itself uses LESS as default CSS preprocessor, but feel free to change it to SASS or whatever you want to. Just replace package.json dependencies and gulp functions and requires and it must work just fine.

## About gulp
Gulp was the chosen task runner to manage and compile the project's resources. As there is no intent into making other options available for now, you are totally free to implement it and send as a pull request (yeah, Grunt folks, I'm looking at you).