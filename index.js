const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_COURSES_QUERY = 'SELECT * FROM course ';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coursesandtests'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

//root route, established connection confirmation.
app.get('/', (req, res) =>{
    res.send('hello from the server')
});

//json pretty print of all data under 'course' in database.
app.get('/test', (req, res) => {
    connection.query(SELECT_ALL_COURSES_QUERY, (err, results) =>{
        if (err){
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

//route to add a new course to the database.
app.get('/course/add', (req, res) => {
    const { name, domain, description } = req.query;
    const INSERT_COURSE_QUERY = `INSERT INTO course (name, domain, description) VALUES('${name}', '${domain}', '${description}')`;
    connection.query(INSERT_COURSE_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else {
            res.send('successfully added course');
        }
    })
})

app.listen(4000, () =>{
    console.log(`Courses server listening on port 4000.`)
});