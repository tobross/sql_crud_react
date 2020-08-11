import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    courses: [],
    course: {
      name: '',
      domain: '',
      description: ''
    },
    test: {
      course_id: '',
      num_of_questions: '',
      name: '',
      duration: ''
    }
  }
  
  componentDidMount(){
    this.getCourses();
  }

  getCourses = _ => {
    fetch('http://localhost:4000/test')
      .then(response => response.json())
      .then(response => this.setState({courses: response.data}))
      .catch(err => console.error(err))
  }

  //route for adding a new course to the database via front end  form submission.
  addCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/course/add?name=${course.name}&domain=${course.domain}&description=${course.description}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }
  
  //xml of text component containing data on course from database
  renderCourse = ({id, name, domain, description}) => <div key={id}><strong>[{id}]{name}: </strong><br></br><center>{domain}, {description}</center></div>

  //render function to display the entire application
render(){
  const {courses, course} = this.state;
  return (
    <div className="App">
  {/* repeating function to display text component of all existing courses     */}
      {courses.map (this.renderCourse)}

      <div>
      <input value={course.name} onChange={e => this.setState({ course: {...course, name: e.target.value}})}/>
      <input value={course.domain} onChange={e => this.setState({ course: {...course, domain: e.target.value}})}/>
      <input value={course.description} onChange={e => this.setState({ course: {...course, description: e.target.value}})}/>
      </div>
      <button onClick={this.addCourse}>Add Course</button>
    </div>
  );
}
}

export default App;
