import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Topic from './components/dashboard/Topic';
import Post from './components/stories/PostDetails/Post';
import CreateStory from './components/stories/CreateStory';
import AuthModule from './components/miniComponents/auth/AuthModule';
import PageNotFound from './components/dashboard/PageNotFound';
import Footer from './components/layout/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main_container">
            <BrowserRouter>
              <div className="main">
                <Navbar />
                <AuthModule/>
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route path='/topics/:id' component={Topic} />
                  <Route path='/post/:id' component={Post} />
                  <Route path='/create' component={CreateStory} />
                  <Route path='/page/:id' component={Dashboard} />
                  <Route path='/404' component={PageNotFound} />
                  <Route component={PageNotFound} />
                </Switch>
                <Footer />
              </div>
            </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
