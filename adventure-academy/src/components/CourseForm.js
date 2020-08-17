import React from 'react';
import '../App.css';
import PDFGenerator from './PDFGenerator.js';

class CourseForm extends React.Component {
    state = {
      course: {
        name: '',
        domain: '',
        description: ''
      }
    }
  
    getCourses = () => {
      this.props.getCourses()
    }
   
    //route for adding a new course to the database via front end  form submission.
    addCourse = _ => {
      const { course } = this.state;
      fetch(`http://localhost:4000/course/add?name=${course.name}&domain=${course.domain}&description=${course.description}`)
      .then(this.getCourses)
      .catch(err => console.error(err))
    }
  
    render(){
      const { course } = this.state;
      return(
        // input fields and submit button to send user-created data to the database.
        <div className="courseForm">
          <br></br>
        <input placeholder="Course name" value={course.name} onChange={e => this.setState({ course: {...course, name: e.target.value}})}/>
        <input placeholder="Domain" value={course.domain} onChange={e => this.setState({ course: {...course, domain: e.target.value}})}/>
        <input placeholder="Description" value={course.description} onChange={e => this.setState({ course: {...course, description: e.target.value}})}/><br></br>
        <button className="btn-btn-light addCourseBtn" onClick={this.addCourse}>Add Course</button><br></br>
        <PDFGenerator courses={this.props.courses} tests={this.props.tests}/>
        </div>
      )
    }
  }

  export default CourseForm;