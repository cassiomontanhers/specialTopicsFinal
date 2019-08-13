import React from 'react'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'



import Owners from './components/Owners'
import AddOwner from './components/AddOwner'


import Cars from './components/Cars'
import AddCar from './components/AddCar'
import './App.css'

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <AddOwner/>
        <AddCar/>
        <h1>Owners</h1>
        <Owners />
        <h1>Cars</h1>
        <Cars />
      </div>
    </ApolloProvider>
  )
}

export default App
