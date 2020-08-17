# sql_crud_react
Coding Challenge Involving React.js, Node.js, and SQL Database.

### Below is the official challenge and my marks showing which parts I was and wasn't able to complete within the time frame.

### I am certain that being in a development environment that deals with these subjects regularly, the small missing pieces will fall into place easily and without too much training.

Develop application to display Courses with related tests (with all basic CRUD operations).
Use cases:

1) User should be able to add/update/delete courses and/or associated tests. [√]

2) Deleting course will also delete associated tests. [√]

3) Default port will display all courses with tests (you can create 2 courses with 2 or more tests for each course to test the program). [√]

4) User should be able to find course by id or name (also by test name). [X]

5) Export courses to PDF, saves PDF to USER dashboard/homepage, courses will be exported with
checkboxes in PDF (checkbox in-front of each course, check/uncheck this box will re-save
document to user dashboard with some notes next to course, this will help user to email/share
this status report document with manager – how many courses they enrolled and how many are
completed with checked box). [X/√] Learned how to export a PDF, but not from smart data.

## Environment: 

 React-UI, [√]

 Node-middleware/express, [√]

 MySQL-DB, [√]

 node-pdf library to create/edit PDFs [X] `found another library since this one does not exist`

## Database:

 Use your local or any cloud MySQL database.


Tables: Course: Test: 

Script:


CREATE TABLE `course` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
`domain` varchar(100) COLLATE utf8_bin DEFAULT NULL,
`description` varchar(100) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `name` (`name`)
);
CREATE TABLE `test` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`course_id` int(10) unsigned NOT NULL,
`num_of_questions` int(10) unsigned NOT NULL,
`name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
`duration` varchar(10) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`)
);


## Assessment Criteria:

This is a simple CRUD assignment using React &amp; node.js, we like to see modularity/extensibility (assuming requirements change every few months), readable code, comments, error handling...etc. (and any other best practices) in your working solution.