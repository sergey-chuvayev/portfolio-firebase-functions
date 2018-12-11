const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const projectsRef = admin.database().ref('projects');

function configureServer() {
  const app = express();

  app.use(cors());

  const typeDefs = gql`
    type Project {
      id: String!
      name: String
    }
    type Query {
      projects: [Project]
    }
  `;

  const resolvers = {
    Query: {
      projects() {
        return projectsRef.once('value')
          .then(snapshot => {
            const projects = snapshot.val();
            if (projects === null) return [];
            return Object.keys(projects).map(o => Object.assign({ id: o }, projects[o]));
          });
      },
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  return app;
}

module.exports = configureServer;