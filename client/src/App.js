import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import "@fortawesome/fontawesome-free/js/all"

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                    <Navigation />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/profile' component={Profile} />
                    </Switch>
                    <Footer />
            </Router>
        </ApolloProvider>
    );
}

export default App;
