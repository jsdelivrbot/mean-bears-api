## Development Notes

For all things heroku, go [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

Run `heroku login` from `cmd` (cant from bash)

Run `heroku open` to get to landing page

Run `heroku local -e .env.local` to run a local server on port `5000`

Use `touch .env.local` to create the file (if needed)

Run `heroku open angular` to see that specific route

Read through `app.js` to see all the node.js server routes

To push changes to the heroku server run `git push heroku master`

To push changes from a non-master branch, run `git push heroku otherbranch:master`

Make sure that the project is linked to the heroku remote repository with this command:

`heroku git:remote -a enigmatic-plains-92812`

Open add-ons with `heroku addons:open papertrail` (or `mongod`)

To edit configuration variables open `.env.local` (or use cmd line)

Test the api locally or remotely using `postman`

Alternatively, test api using browser `https://enigmatic-plains-92812.herokuapp.com/api/bears` 

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
