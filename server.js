const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_COURSES_QUERY = 'SELECT * FROM course';
const SELECT_ALL_TESTS_QUERY = 'SELECT * FROM test';


// Obviously, one would not store secure server connection information in a place where it could readily be accessed via open source, but this is a simple test challenge

// Also, using multipleStatements is not production quality due to risk of injection but it is the fastest way to achieve the desired result.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coursesandtests',
    multipleStatements: true
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
app.get('/course', (req, res) => {
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

//json pretty print of all data under 'test' in database.
app.get('/test', (req, res) => {
    connection.query(SELECT_ALL_TESTS_QUERY, (err, results) =>{
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

app.get('/test/add', (req, res) => {
    const { course_id, num_of_questions, name, duration } = req.query;
    const INSERT_TEST_QUERY = `INSERT INTO test (course_id, num_of_questions, name, duration) VALUES('${course_id}', '${num_of_questions}', '${name}', '${duration}min')`;
    connection.query(INSERT_TEST_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else {
            res.send('successfully added Test');
        }
    })
})

app.get('/test/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_TEST_QUERY = `DELETE FROM test WHERE id=${id}`;
    connection.query(DELETE_TEST_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else {
            res.send('successfully deleted Test')
        }
    })
})

app.get('/course/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_COURSE_QUERY = `DELETE FROM course WHERE id=${id}; DELETE FROM test WHERE course_id=${id};`;
    connection.query(DELETE_COURSE_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else {
            res.send('successfully deleted Course and Associated Tests')
        }
    })
})

app.get('/course/update', (req, res) => {
    const { id, name, domain, description} = req.query;
    const UPDATE_COURSE_QUERY = `UPDATE course SET name='${name}', domain='${domain}', description='${description}' WHERE id='${id}';`;
    connection.query(UPDATE_COURSE_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else {
            res.send('successfully Updated Course')
        }
    })
})

app.get('/test/update', (req, res) => {
    const { id, name, duration, num_of_questions, course_id} = req.query;
    const UPDATE_TEST_QUERY = `UPDATE test SET name='${name}', duration='${duration}min', num_of_questions='${num_of_questions}', course_id='${course_id}' WHERE id='${id}';`;
    connection.query(UPDATE_TEST_QUERY, (err, results) => {
        if(err){
            return res.send(err);
        }else {
            res.send('successfully Updated Test')
        }
    })
})

app.listen(4000, () =>{
    console.log(`Courses server listening on port 4000.`)
});