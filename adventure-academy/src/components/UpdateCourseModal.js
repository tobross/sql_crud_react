import React from 'react';
import '../App.css';

//This modal is used to update the values within the selected course's card. All except ID, of course.

class UpdateCourseModal extends React.Component{
    state = {
      course: {
        id: this.props.id,
        name: '',
        domain: '',
        description: ''
      }
    };
    updateCourse = _ => {
      const { course } = this.state;
      fetch(`http://localhost:4000/course/update?name=${course.name}&domain=${course.domain}&description=${course.description}&id=${course.id}`)
      .then(this.getCourses)
      .then(this.handleClose)
      .catch(err => console.error(err))
    }
  
    getCourses = () => {
      this.props.getCourses()
    }
  
    handleClose = () => {
      this.props.handleClose()
    }
  
    render(){
      const {course} = this.state;
      const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
  
      return(
        <div className={showHideClassName}>
          <br></br><br></br>
        <input className="" placeholder="Course name" value={course.name} onChange={e => this.setState({ course: {...course, name: e.target.value}})}/>
        <br></br>
        <input placeholder="Domain" value={course.domain} onChange={e => this.setState({ course: {...course, domain: e.target.value}})}/>
        <br></br>
        <input placeholder="Description" value={course.description} onChange={e => this.setState({ course: {...course, description: e.target.value}})}/>
        <br></br>
        <button className="btn btn-success" onClick={this.updateCourse} >Submit</button> 
        <button className="btn btn-danger" onClick={this.handleClose}>X</button>
      </div>
      )
    }
  }

  export default UpdateCourseModal;