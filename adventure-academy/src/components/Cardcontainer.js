import React from 'react';
import '../App.css';
import Coursecard from './Coursecard.js';

// This container sets the bootstrap grid row and functions as a loop constructor to create as many Coursecards as there are courses found in the database.
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

  export default Cardcontainer;