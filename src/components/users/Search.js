import React, { Component } from 'react';
import PropTypes from 'prop-types'


export class Search extends Component {
  state= {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };
  onChange = e => this.setState({[e.target.name]: e.target.value});

  onSubmit = e => { 
    e.preventDefault();
    // console.log(this.state.text) 
    if (this.state.text===''){
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({text: ''});
    }
    
  };
  render() {
    const {showClear, clearUsers, setAlert} = this.props;
    return (
      <div style={{margin: '20px 20px'}}>
        <form className="form-text"  onSubmit = {this.onSubmit}>
          <input type="text" name="text" placeholder="Search Users..." value={this.state.text}
            onChange={this.onChange} />
          <input type="submit" value="Search" className="btn btn-block btn-dark"/>
          }  
        </form>
        {showClear &&
        <button className=" btn btn-block btn-light" onClick={clearUsers}> Clear</button>
        }
      </div>
    )
  }
}

export default Search
