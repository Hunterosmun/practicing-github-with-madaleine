const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const http = require('http')
const cors = require('cors')

const port = 3001
const people = [
  {
    id: 1,
    name: 'Dallin',
    awesome: true,
    isSecretly3Penguins: false,
    bestFriendID: 3
  },
  { id: 2, name: 'Kip', awesome: true, isSecretly3Penguins: false },
  {
    id: 3,
    name: 'Papa',
    awesome: true,
    isSecretly3Penguins: false,
    bestFriendID: 4
  },
  { id: 4, name: 'Hitler', awesome: false, isSecretly3Penguins: true }
]

const gql = a => a[0]
const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
    isAwesome: Boolean
    isSecretly3Penguins: Boolean
    bestFriend: Person
  }

  type User {
    id: ID!
    displayName: String!
  }

  type Query {
    people: [Person!]!
    person(id: ID!): Person
    user: User
  }
`
const resolvers = {
  Query: {
    people: () => {
      return people
    },
    person: (_, { id }) => {
      return people.find(per => per.id == id)
    },
    user: (_, __, ctx) => {
      console.log(ctx)
      return ctx.user
    }
  },
  Person: {
    isAwesome: person => {
      return person.awesome
    },
    bestFriend: person => {
      return people.find(per => per.id === person.bestFriendID)
    }
  }
}

async function deApp (port) {
  const app = express(cors())

  app.use((req, res, next) => {
    res.locals.user = { id: 7, displayName: 'Fredlles' }
    next()
  })

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    context: ({ res }) => ({ user: res.locals.user }),
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port }, resolve))
  console.log(
    `All around me are a million path-names, million path-names, million path-na~aa~aames. (port: ${port})`
  )

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/api/people', (req, res) => {
    res.send(people)
  })

  app.get('/api/person/:id', (req, res) => {
    const person = people.find(per => per.id === +req.params.id)
    if (person) res.send(person)
    else res.status(404).send('Nobody here with that id')
  })

  app.get('/api/user', (req, res) => {
    res.send(res.locals.user)
  })
}

deApp(port)
