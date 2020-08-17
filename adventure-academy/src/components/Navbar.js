import React from 'react';
import '../App.css';

class Navbar extends React.Component {

  state = {
    query: '',
    courses: {},
    tests: {}
  }

  //secondary attempt at a search query, falling short again.
  // I had assumed that sending the entire result of the inner join query to both courses: [] and tests: [] would result in my being able to parse out the objects that I needed from each using the format that I had already established with my components. -- I did not see success on this route.
  search = _ => {
    const { query } = this.state;
    fetch(`http://localhost:4000/search?query=${query};`)
    .then(response => response.json())
    .then(response => this.setState({courses: response.data, tests: response.data}))
    .then(console.log(this.state.courses))
    .catch(err => console.error(err))
  }

    render(){
      return(
        <div className="navbar">
    <div className="navbar-inner">
      <a className="brand" href="localhost:3000">Adventure Academy - Learn to be a hero!</a>
      <form className="navbar-search pull-right">
    <input type="text" className="search-query" onChange={e => this.setState({ query: e.target.value})} onSubmit={this.search}placeholder="Search" />
  </form>
    </div>
  </div>
      )
    }
  }

  export default Navbar;
