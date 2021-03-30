
import './App.css';
import React, {Component, Fragment} from 'react';
import  {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';


class App extends Component {

  state= {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

//Search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ loading: false, users: res.data.items});
  }

  getUser= async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ loading: false, user: res.data});
  }

  // Get Users repos
  getUserRepos= async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
                                  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ loading: false, repos: res.data});
  }

  clearUsers = () =>{
    this.setState({ users: []})
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(()=>this.setState({alert: null}), 5000);
  }
  
  render(){
    const {users, user, loading, repos}=this.state;
    
    return (
      <Router>
        <div className='App'>
          <Navbar/>
          <div className='container'>
            <Alert alert={this.state.alert}/>
            <switch>
              <Route exact path='/' render={ props=> (
              <Fragment>
                <Search searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 1 ? true : false }
                    setAlert = {this.setAlert} />
            
                <Users users = {users} loading = {loading}/>
              </Fragment>)
              }/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={ props => (
                <Fragment>
                  <User { ...props} getUser={this.getUser} user={user} repos= {repos} loading={loading} getUserRepos={this.getUserRepos}/>
                </Fragment>)
            

              }/>
            </switch> 
          </div>
        </div>
      </Router>
    );
  }
  
}

export default App;
