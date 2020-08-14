import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

class Testcard extends React.Component {
    state = {
      test: '',
      course_id: '',
      num_of_questions: '',
      duration: '',
      id: this.props.value.id
    }
  
    showModal = () => {
      this.setState({show: true});
    }
    
    hideModal = () => {
      this.setState({show: false});
    }
  
    getTests = () => {
      this.props.getTests()
    }
  
    deleteTest = _ => {
      const {test} = this.state;
      fetch(`http://localhost:4000/test/delete?id=${this.props.value.id}`)
      .then(this.getTests)
      .catch(err => console.error(err))
    }
  
    render(){
      return (<div className={ "testBox test-"+this.props.value.id} data-course={this.props.value.course_id}>
        <div><div className="testName">[{this.props.value.id}] {this.props.value.name}:</div><br></br><strong>Duration:</strong> {this.props.value.duration}<br></br><strong>Questions:</strong> {this.props.value.num_of_questions}</div>
        <br></br><a className="btn btn-warning">Edit</a><a className="btn btn-danger" onClick={this.deleteTest}>Delete</a>
        <UpdateTestModal getTests={this.getTests} show={this.state.show} handleClose={this.hideModal} id={this.props.value.id}/>
      </div>
      )
    }
  }

  export default Testcard;