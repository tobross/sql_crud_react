import React from 'react';
import '../App.css';
import UpdateTestModal from './UpdateTestModal.js';

//using information passed from App down through Cardcontainer and Coursecard, this component finally displays the information of only the tests associated with the course above.

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
    fetch(`http://localhost:4000/test/delete?id=${this.props.value.id}`)
    .then(this.getTests)
    .catch(err => console.error(err))
  }

  render(){
    return (<div className={ "testBox test-"+this.props.value.id} data-course={this.props.value.course_id}>
      <div><div className="testName"><button className="btn btn-warning editBtn" onClick={this.showModal}>Edit</button>[{this.props.value.id}] {this.props.value.name}: <button className="btn btn-danger deleteBtn" onClick={this.deleteTest}>X</button></div><br></br><strong>Duration:</strong> {this.props.value.duration}<br></br><strong>Questions:</strong> {this.props.value.num_of_questions}</div>
      <br></br>
      <UpdateTestModal getTests={this.getTests} show={this.state.show} handleClose={this.hideModal} id={this.props.value.id}/>
    </div>
    )
  }
}

  export default Testcard;