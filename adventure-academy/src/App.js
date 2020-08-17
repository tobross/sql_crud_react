import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Cardcontainer from './components/Cardcontainer.js';
import CourseForm from './components/CourseForm.js';

class App extends Component {
//state sets a place for the array of results from get fetch requests to be read from, and initial place for course and tests to be send from. Left in for reference.
  state = {
    courses: [],
    course: {
      name: '',
      domain: '',
      description: ''
    },
    tests: [],
    test: {
      course_id: '',
      num_of_questions: '',
      name: '',
      duration: ''
    }
  }
  
  //establishes initial dataset via state when the app is loaded or refreshed.
  componentDidMount(){
    this.getCourses();
    this.getTests();
  }

    //fetch current list of all courses in database and update state.courses with that information in .json format.
  getCourses = _ => {
    fetch('http://localhost:4000/course')
      .then(response => response.json())
      // .then(({data}) => {
      //   console.log(data)
      // })
      .then(response => this.setState({courses: response.data}))
      .catch(err => console.error(err))
      
  }

  //fetch current list of all tests in database and update state.tests with that information in .json format.
  getTests = _ => {
    fetch('http://localhost:4000/test')
      .then(response => response.json())
      // .then(({data}) => {
      //   console.log(data)
      // })
      .then(response => this.setState({tests: response.data}))
      .catch(err => console.error(err))
  }

  //attempt at a search function. My understanding of SQL and data parsing fell short of this request.
  getSearch = _ => {
    fetch('http://localhost:4000/search')
    .then(response => response.json())
    .then(response => this.setState({
      courses: response.data,
      tests: response.data
    }))
    .catch(err => console.error(err))
  }

  //render function to display the entire application - Componentized for readability and best practices
render(){
  const {courses, tests} = this.state;
  return (
    <div className="App">
      <Navbar state={this.state}/>
      <Cardcontainer getCourses={this.getCourses} getTests={this.getTests} courses={courses} tests={tests}/>
      <CourseForm getCourses={this.getCourses} courses={this.props.courses} test={this.props.tests}/>
    </div>
  );
}
}

export default App;


 // this return statement uses a length check contained in a JSX fragment that surrounds the entire component's content. This alleviates the issue of the pre-render in React.js that is the bane of React developers. And since the deprecation and misuse of componentWillMount(), solutions to extensible options have become much more complex than is necessary for this example.
//  return (<> {this.props.courses.length > 0? <div className="card" id={this.props.courses[0].id}>
//  <strong>[{this.props.courses[0].id}] {this.props.courses[0].name}</strong>
//  <p>{this.props.courses[0].domain}</p>
//  <p>{this.props.courses[0].description}</p>
//  <div>
//    {elements}
//  </div>
//  </div>:null}
//  </>
//  )