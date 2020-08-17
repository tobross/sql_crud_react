import React from 'react';
import '../App.css';

//second attempt at creating a modal, using react component to enable state. -- Success! 
//this modal is used to add a test to the database and relate it with the course above through the course_id column.
class Modal extends React.Component{
    state = {
      test: {
        name: '',
        duration: '',
        num_of_questions: '',
        course_id: this.props.courseId
      }
    };
    addTest = _ => {
      const { test } = this.state;
      fetch(`http://localhost:4000/test/add?name=${test.name}&course_id=${test.course_id}&num_of_questions=${test.num_of_questions}&duration=${test.duration}`)
      .then(this.handleClose)
      .then(this.getTests)
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
        <input className="fixes" placeholder="Test name" value={test.name} onChange={e => this.setState({ test: {...test, name: e.target.value}})}/>
        <input placeholder="Duration" value={test.duration} onChange={e => this.setState({ test: {...test, duration: e.target.value}})}/>
        <input placeholder="# of Questions" value={test.num_of_questions} onChange={e => this.setState({ test: {...test, num_of_questions: e.target.value}})}/>
        <button className="btn btn-success" onClick={this.addTest}>Add Test</button> 
        <button className="btn btn-danger" onClick={this.handleClose}>X</button>
      </div>
      )
    }
  }

  export default Modal;