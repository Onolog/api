import debug from 'debug';
import {GraphQLServer} from 'graphql-yoga';
import jwt from 'express-jwt';

import models from './models';
import schema from './graphql';

const PROD = process.env.NODE_ENV === 'production';

const context = ({request, response, connection}) => ({
  models,
  user: request.user,
});

const options = {
  cors: null,
  endpoint: '/',
  playground: false,
  port: process.env.PORT,
};

if (!PROD) {
  options.debug = true;
  options.playground = '/';
}

const server = new GraphQLServer({
  context,
  schema,
});

// Require json web tokens to make requests in production.
server.express.use(jwt({
  credentialsRequired: PROD,
  secret: process.env.JWT_SECRET,
}));

// Sync DB and start server.
models.sequelize.sync().then(() => {
  server.start(options, () => {
    debug('@onolog/api:server')(`Listening on port ${options.port}`);
  });
});
