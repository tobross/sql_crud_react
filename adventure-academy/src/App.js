import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

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
  
  componentDidMount(){
    this.getCourses();
    this.getTests();
  }

  getCourses = _ => {
    fetch('http://localhost:4000/course')
      .then(response => response.json())
      // .then(({data}) => {
      //   console.log(data)
      // })
      .then(response => this.setState({courses: response.data}))
      .catch(err => console.error(err))
      
  }

  getTests = _ => {
    fetch('http://localhost:4000/test')
      .then(response => response.json())
      // .then(({data}) => {
      //   console.log(data)
      // })
      .then(response => this.setState({tests: response.data}))
      .catch(err => console.error(err))
  }
  //route for adding a new course to the database via front end  form submission.
  addCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/course/add?name=${course.name}&domain=${course.domain}&description=${course.description}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

  addTest = _ => {
    const { test } = this.state;
    fetch(`http://localhost:4000/test/add?name=${test.name}&course_id=${test.course_id}&num_of_questions=${test.num_of_questions}&duration=${test.duration}`)
    .then(this.getTests)
    .catch(err => console.error(err))
  }

  deleteTest = _ => {
    const {test} = this.state;
    fetch(`http://localhost:4000/test/delete?id=${test.id}`)
    .then(this.getTests)
    .catch(err => console.error(err))
  }

  deleteCourse = _ => {
    const { course } = this.state;
    fetch(`http://localhost:4000/course/delete?id=${course.id}`)
    .then(this.getCourses)
    .catch(err => console.error(err))
  }

  renderTest = ({id, course_id, name, num_of_questions, duration}) => <div className={course_id} key={id}><strong>[{course_id}] {name}:</strong> {duration}, {num_of_questions}</div>
  
  //xml of text component containing data on course from database -- unused
  renderCourse = ({id, name, domain, description}) => <div className="card" key={id}><strong>[{id}] {name}: </strong><br></br><center>{domain}, {description}</center>
  <p className="testingText">Boop </p><br></br>
  <button className="btn btn-primary">Print Course and Tests</button>
  
  </div>


  //render function to display the entire application
render(){
  const {courses, course, tests} = this.state;
  return (
    <div className="App">
      <center><Cardcontainer getCourses={this.getCourses} getTests={this.getTests} courses={courses} tests={tests}/></center>
        {/* input fields and submit button to send user-created data to the database. */}
      <div className="courseForm">
        <br></br>
      <input placeholder="Course name" value={course.name} onChange={e => this.setState({ course: {...course, name: e.target.value}})}/>
      <input placeholder="Domain" value={course.domain} onChange={e => this.setState({ course: {...course, domain: e.target.value}})}/>
      <input placeholder="Description" value={course.description} onChange={e => this.setState({ course: {...course, description: e.target.value}})}/><br></br>
      <button onClick={this.addCourse}>Add Course</button>
      <br></br><br></br>
      </div>
      <div>
      {/* Input fields and button to add a new test to the database, including an associated course id */}
      {/* <input placeholder="Test name" value={test.name} onChange={e => this.setState({ test: {...test, name: e.target.value}})}/>
      <input placeholder="Duration" value={test.duration} onChange={e => this.setState({ test: {...test, duration: e.target.value}})}/>
      <input placeholder="# of Questions" value={test.num_of_questions} onChange={e => this.setState({ test: {...test, num_of_questions: e.target.value}})}/>
      <input placeholder="Associated Course #" value={test.course_id} onChange={e => this.setState({ test: {...test, course_id: e.target.value}})}/>
      <br></br>
      <button onClick={this.addTest}>Add Test</button>  */}
      </div>
    </div>
  );
}
}

class Testcard extends React.Component {
  state = {
    test: '',
    course_id: '',
    num_of_questions: '',
    duration: '',
    id: this.props.value.id
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
      <div><div className="testName">{this.props.value.name}:</div><br></br><strong>Duration:</strong> {this.props.value.duration}<br></br><strong>Questions:</strong> {this.props.value.num_of_questions}</div>
      <br></br><a className="btn btn-warning">Edit</a><a className="btn btn-danger" onClick={this.deleteTest}>Delete</a>
    </div>
    )
  }
}

class Coursecard extends React.Component {
  state = {
    show: false
 };

 showModal = () => {
  this.setState({show: true});
}

hideModal = () => {
  this.setState({show: false});
}

getTests = () => {
  this.props.getTests()
}

getCourses = () => {
  this.props.getCourses()
}

deleteCourse = _ => {
  const {course} = this.state;
  fetch(`http://localhost:4000/course/delete?id=${this.props.value.id}`)
  .then(this.getCourses)
  .catch(err => console.error(err))
}

  render(){
    //sorting through an array of tests and associating them with the correct course's card, then appending them through the elements tag.
    var arr = this.props.tests;
    var elements = [];
    for (var i=0; i<arr.length; i++){
      if(arr[i].course_id === this.props.value.id){
      elements.push(<Testcard getTests={this.getTests} value={arr[i]} key={arr[i].id}/>)
      }
    }
   return(
     <div className="card col-md-3">
       <div className="title"><a className="btn btn-warning editBtn">Edit</a><strong >[{this.props.value.id}] {this.props.value.name}</strong><a className="btn btn-danger deleteBtn" onClick={this.deleteCourse}>X</a></div>{'\n'}
       <p>{this.props.value.domain}<br></br>{this.props.value.description}</p>
       <div className="testDivTitle">
         <strong>Associated Tests:</strong>
       </div>
       <div className="testContainer">
         {elements}
       </div>
       <Modal getTests={this.getTests} show={this.state.show} handleClose={this.hideModal} courseId={this.props.value.id} test={this.props.test}>
       </Modal>
       <a className="btn btn-primary" onClick={this.showModal}>Add Test</a>
     </div>
   )
  }
}

class Cardcontainer extends React.Component {
  getTests = () => {
    this.props.getTests()
  }

  getCourses = () => {
    this.props.getCourses()
  }
 
    render(){
      var arr = this.props.courses;
      var elements = [];
      for (var i=0; i<arr.length; i++){
        elements.push(<Coursecard getCourses={this.getCourses} getTests={this.getTests} value={arr[i]} key={arr[i].id} tests={this.props.tests} test={this.props.test} courseId={arr[i].id} courses=
          {this.props.courses}/>)
      }
      return(<div className="row">
      {elements}
      </div>)
    }
    
}


//second attempt at creating a modal, using react component to enable state.
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
    .then(this.getTests)
    .catch(err => console.error(err))
  }

  getTests = () => {
    this.props.getTests()
  }

  render(){
    const {test} = this.state;
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return(
      <div className={showHideClassName}>
      <input className="fixes" placeholder="Test name" value={test.name} onChange={e => this.setState({ test: {...test, name: e.target.value}})}/>
      <input placeholder="Duration" value={test.duration} onChange={e => this.setState({ test: {...test, duration: e.target.value}})}/>
      <input placeholder="# of Questions" value={test.num_of_questions} onChange={e => this.setState({ test: {...test, num_of_questions: e.target.value}})}/>
      <a className="btn btn-success" onClick={this.addTest}>Add Test</a> 
      <a className="btn btn-danger" onClick={this.props.handleClose}>X</a>
    </div>
    )
  }
}

//first attempt at a modal, created as a const.

// const Modal = ({ handleClose, show, test, courseId}) => {
//   const showHideClassName = show ? "modal display-block" : "modal display-none";
//   return(
//     <div className={showHideClassName}>
//       <input className="fixes" placeholder="Test name" />
//       <input placeholder="Duration" />
//       <input placeholder="# of Questions" />
//       <input placeholder={courseId}/>
//       <a className="btn btn-success" >Add Test</a> 
//       <a className="btn btn-danger" onClick={handleClose}>X</a>
//     </div>
//   )
// }

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


 {/* repeating function to display text component of all existing courses     */}
      {/* {courses.map (this.renderCourse)} 
      {tests.map (this.renderTest)}  */}
  {/* <Coursecard courses={courses} tests={tests} /> */}