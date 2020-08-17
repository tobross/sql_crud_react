import React from 'react';
import '../App.css';
import Testcard from './Testcard.js';
import Modal from './Modal.js';
import UpdateCourseModal from './UpdateCourseModal.js';

class Coursecard extends React.Component {
    state = {
      show: false,
      showUpdate: false
   };

   showModal = () => {
    this.setState({show: true});
  }

  hideModal = () => {
    this.setState({show: false});
  }

  showUpdateModal = () => {
    this.setState({showUpdate: true});
  }

  hideUpdateModal = () => {
    this.setState({showUpdate: false});
  }

  getTests = () => {
    this.props.getTests()
  }

  getCourses = () => {
    this.props.getCourses()
  }

  deleteCourse = _ => {
    fetch(`http://localhost:4000/course/delete?id=${this.props.value.id}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

    render(){
      //sorting through an array of tests and associating them with the correct course's card, then appending them through the elements tag as Testcards.
      var arr = this.props.tests;
      var elements = [];
      for (var i=0; i<arr.length; i++){
        if(arr[i].course_id === this.props.value.id){
        elements.push(<Testcard getTests={this.getTests} value={arr[i]} key={arr[i].id}/>)
        }
      }
      //this card also contains 2 seperate modals, one for updating the course, and one for adding a test to the course. This is done to prevent users from adding tests to courses that do not yet exist. Also, the modals function independent of eachother.
     return(
       <div className="courseCard card col-md-3">
         <img alt="firegif" className="firewall" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1582aa04-9a32-484b-8a19-392606702ac2/d2ysusm-256b76dc-decd-418d-aa24-49d7f2772e0e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMTU4MmFhMDQtOWEzMi00ODRiLThhMTktMzkyNjA2NzAyYWMyXC9kMnlzdXNtLTI1NmI3NmRjLWRlY2QtNDE4ZC1hYTI0LTQ5ZDdmMjc3MmUwZS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Cyfwx21V0fWL7yt-fAjvra9kqoRC0_yoxU9Q4Dkie-Q"></img>
         <div className="title"><button className="btn btn-warning editBtn" onClick={this.showUpdateModal}>Edit</button><strong >[{this.props.value.id}] {this.props.value.name}</strong><button className="btn btn-danger deleteBtn" onClick={this.deleteCourse}>X</button></div>{'\n'}
         <p>{this.props.value.domain}<br></br>{this.props.value.description}</p>
         <div className="testDivTitle">
           <strong>Associated Tests:</strong>
         </div>
         <div className="testContainer">
           {elements}
         </div>
         <Modal getTests={this.getTests} show={this.state.show} handleClose={this.hideModal} courseId={this.props.value.id} test={this.props.test}>
         </Modal>
         <UpdateCourseModal id={this.props.value.id} getCourses={this.getCourses} show={this.state.showUpdate} handleClose={this.hideUpdateModal} courseId={this.props.value.id} course={this.props.course}>
         </UpdateCourseModal>
         <button className="btn btn-primary addTestBtn" onClick={this.showModal}>Add Test</button>
       </div>
     )
    }
  }

  export default Coursecard;