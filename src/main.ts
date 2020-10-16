import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import * as mongoose from 'mongoose'
import * as path from 'path';

const MONGODB_URI = !!process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://root:root@localhost:27017";

async function bootstrap() {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }
  try {
    const schema = await buildSchema({
      resolvers: [path.join(__dirname, '..') + '/**/*.resolver.{ts,js}'],
      container: Container,
    })
    const server = new ApolloServer({
      schema,
      playground: true
    })
    const { url } = await server.listen()
    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (ex) {
    console.error(ex)
  }

  // Start the server
}

bootstrap()
