import express from 'express'
import { GraphQLSchema } from 'graphql'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'

const schema = `
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello() { return 'hello...' }
  }
}

const execSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: execSchema
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.listen(3000, err => console.log(err ? err : 'listening...'))