// import the libs we need
import React, { Component } from 'react';
// import '../normalize.css';
import style from '../App.css';

// create a React Component called _EventList_
class Nav extends Component {

  render(){
    // console.log(this.props);
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={this.props.searchTerm}
          onChange={this.props.handleUpdateSearch}
         />
        <button onClick={this.props.handleSubmitSearch}>Submit</button>
        <button className="like" onClick={this.props.handleFormSubmit}>Like</button>
      </div>
    );
  }
}

export default Nav;
