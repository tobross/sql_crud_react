import React, { Component } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



class PDFGenerator extends Component{
    state = {
        data: ''
    }

    jsPdfGenerator = () => {
        var doc = new jsPDF(this.props.data);
        // var courses = this.props.courses;
        // var tests = this.props.tests;
    
    doc.autoTable({
        theme: 'striped',
        styles: {fillColor: [0, 123, 255]},
        head:[["Course ID", "Course Name", "Domain", "Description", '']],
        body: [
            ['1', 'Forces', 'Evocation', 'Magic', ''],
            ["Test ID", "Test Name", "Course ID", "Duration", "Number of Questions"],
            ["1", "Fire", "1", "90min", "100"],
            // ["2", "Water", "2", "100min", "10"]
        ],
    })
    doc.save("courses-tests.pdf");
}

    render(){
        return(
            <div className="PDFGenerator">
                <button className="btn btn-dark exportBtn" onClick={this.jsPdfGenerator}>Export to PDF</button>
            </div>
        )
    }
}

export default PDFGenerator;