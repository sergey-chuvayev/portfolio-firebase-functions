const graphqlTools = require('graphql-tools');
const { gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const schema = gql`
  type Project {
    id: String!
    name: String
  }
  type Query {
    projects: [Project]
  }
`;

module.exports = graphqlTools.makeExecutableSchema({
  typeDefs: schema,
  resolvers
});