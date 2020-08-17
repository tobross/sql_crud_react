import React from 'react';
import '../App.css';

//same as updateCourseModal except with different query to the DB and form.

class UpdateTestModal extends React.Component{
    state = {
      test: {
        id: this.props.id,
        tname: '',
        duration: '',
        num_of_questions: '',
        course_id: ''
      }
    };
    updateTest = _ => {
      const { test } = this.state;
      fetch(`http://localhost:4000/test/update?name=${test.name}&course_id=${test.course_id}&num_of_questions=${test.num_of_questions}&duration=${test.duration}&id=${test.id}`)
      .then(this.getTests)
      .then(this.handleClose)
      .catch(err => console.error(err))
    }
  
    getTests = () => {
      this.props.getTests()
    }
  
    handleClose = () => {
      this.props.handleClose()
    }
  
    render(){
      const {test} = this.state;
      const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
  
      return(
        <div className={showHideClassName}>
        <input className="" placeholder="Test name" value={test.name} onChange={e => this.setState({ test: {...test, name: e.target.value}})}/>
        <br></br>
        <input placeholder="Duration" value={test.duration} onChange={e => this.setState({ test: {...test, duration: e.target.value}})}/><br></br>
        <input placeholder="# of Questions" value={test.num_of_questions} onChange={e => this.setState({ test: {...test, num_of_questions: e.target.value}})}/>
        <br></br>
        <input placeholder="Course Number" value={test.course_id} onChange={e => this.setState({ test: {...test, course_id: e.target.value}})}/>
        <br></br>
        <button className="btn btn-success updateBtn" onClick={this.updateTest}>Submit</button> 
        <button className="btn btn-danger updateClose" onClick={this.handleClose}>X</button>
      </div>
      )
    }
  }

  export default UpdateTestModal;