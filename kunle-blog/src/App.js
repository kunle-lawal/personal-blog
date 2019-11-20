import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/stories/PostDetails/Post';
import PageNotFound from './components/dashboard/PageNotFound';
import Footer from './components/layout/Footer'
import Admin from './components/dashboard/Admin/Admin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main_container">
            <BrowserRouter>
              <div className="main">
                <Navbar />
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route path='/post/:id' component={Post} />
                  <Route exact path='/admin' component={Admin} />
                  <Route path='/admin/:id' component={Admin} />
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
