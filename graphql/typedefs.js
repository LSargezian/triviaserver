const { readFileSync } = require('fs');
const { gql } = require('apollo-server-express');
const path = require('path');

const typeDefs = gql(
    readFileSync(path.join(__dirname, 'schema.graphql'), { encoding: 'utf-8' })
);

module.exports = typeDefs;
