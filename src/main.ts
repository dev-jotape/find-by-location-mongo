import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import * as mongoose from 'mongoose'
import * as path from 'path';

const MONGODB_URI = !!process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://root:root@mongo";


const connectWithRetry = () => {
  console.info('MongoDB connection with retry')
  return mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  });
}

async function bootstrap() {
  if (mongoose.connection.readyState === 0) {
    connectWithRetry();
  }

  mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`)
    setTimeout(connectWithRetry, 5000)
    // process.exit(-1)
  });

  mongoose.connection.on('connected', () => {
    console.info('MongoDB is connected')
  })

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
    console.info(`Server is running, GraphQL Playground available at ${url}`)
  } catch (ex) {
    console.error(ex)
  }

  // Start the server
}

bootstrap()
