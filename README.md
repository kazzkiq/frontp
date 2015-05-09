# Frontp
Frontp is a simple and general scaffolding pattern to create single-page projects focused fully on the client-side.


## What is it?

So, you're starting a new single-page webapp, but don't know exactly how its structure should be? Well, Frontp solve this issue, aiming at a simpler and extendable files/folders structure pattern for your single-page apps and giving basic features that every front-end project should rely on.

Everything (besides images) is compiled into three single (HTML, CSS and JavaScript) files, allowing you to keep your code modularized at development, but full performatic when deploying your webapp in production.

### Features
Frontp uses 3rd party packages to fastly give you an environment with the bellow features:
- HTML basic templating engine
- Modularized CSS environment
- Modularized JavsScript environment
- CSS Preprocessing
- CSS minimizing
- JavaScript minimizing

## Usage

```bash
git clone https://github.com/kazzkiq/frontp.git
cd frontp
npm install
gulp compile:all
node server.js
```

If you want don't want to manually compile everything each time you edit a file you can run:

```bash
gulp watch:all
```

Now you can access your app by: http://127.0.0.1:8888

----

> **Obs.:** Alternatively to the Node.js server, you can do the first three steps into any HTTP server you have (Apache, NGINX, etc) and access your app via: `http://your-local-addr:your-port/frontp/app/dist/index.html`

## About LESS
The project uses LESS as the default tool for CSS preprocessing, but feel free to change it to SASS or whatever you want to. Just replace `package.json` dependencies and gulp functions and requires and it must work just fine.

## About gulp
Gulp was the chosen build system to manage and compile the project's resources. Although there is no intent into making other options available for now, you are totally free to implement it and send as a pull request (yeah, Grunt folks, I'm looking at you).

## Packages used:
As stated above, Frontp is just a scaffold tool and, besides the files/folders structure and gulpfile.js, every other functionality is made possible by 3rd plugins and packages. They're listed bellow:
- gulp
- gulp-minify-css
- gulp-uglify
- gulp-rename
- gulp-notify
- gulp-autoprefixer
- gulp-concat
- gulp-less
- gulp-file-include
- del