import 'reflect-metadata'
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import * as path from 'path';

export const server = async () => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '..') + '/**/*.resolver.{ts,js}'],
    container: Container,
  });
  
  const apolloServer = new ApolloServer({
    schema,
  });

  const apolloTest = createTestClient(apolloServer);
  return apolloTest;
}
