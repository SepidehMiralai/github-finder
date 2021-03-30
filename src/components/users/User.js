import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Repos from '../repos/Repos';


export class User extends Component {

  componentDidMount(){
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes={
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
  }

  render() {
    const {
      name, 
      id,
      blog,
      company,
      login,
      avatar_url,
      url,
      html_url,
      email,
      bio,
      followers,
      following,
      hireable,
      location,
      public_repos,
      public_gists
    } = this.props.user;
    const {loading} = this.props;
    const {repos} = this.props;
    console.log('please show the info!');
    console.log(email);

    if (loading) return <Spinner/>;

    return (
      <Fragment>
        <Link to = '/' class="btn btn-light">
          Back to Search
        </Link>
        Hirable: {' '}
        {hireable ? (
          <i className="fas fa-check text-success "/>
         ) : ( 
            <i className="fas fa-times-circle text-danger"/>
         )}
         <div className='card grid-2'>
           <div className='all-center'>
             <img
              src={avatar_url}
              alt=''
              className='round-img'
              style={{width: '150px'}}  
              />
              <h2> {name} </h2>
              <p> Location: {location} </p>
           </div>
           <div>
             <h3> Bio</h3>
             {bio && 
                <Fragment>
                  <p> {bio} </p>
               </Fragment>}
              <a href={html_url} className='btn btn-dark my-1'> Visit Github Profile</a>
              <br/>
              {login &&
                <Fragment>
                  <b> Username:</b>{login}
                </Fragment>}
                <br/>
                {company &&
                <Fragment>
                  <strong> Company:</strong>{company}
                </Fragment>}
                <br/>
                {blog &&
                <Fragment>
                  <strong> Website:</strong>{blog}
                </Fragment>}
           </div>
         </div>
         <div className='card text-center'>
           <div className='badge badge-primary'> Followers: {followers} </div>
           <div className='badge badge-success'> Following: {following} </div>
           <div className='badge badge-light'> Public Repos: {public_repos} </div>
           <div className='badge badge-dark'> Public Gists: {public_gists} </div>
         </div>
         
          <Repos repos={repos}/>

      </Fragment>
    )
  }
}

export default User
