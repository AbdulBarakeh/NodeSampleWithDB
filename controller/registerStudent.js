const mongoose = require('../models/db');
var model = require('../models/Schemas/Students');

exports.register = (req, res) => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    console.dir('mongoose connected.')
    var data = { Name: req.body.studentName, FieldOfStudy: req.body.fieldOfStudy }
    let student = new model.Students(data);
    var students = model.Students;
    //If doc already exist do not insert again
    students.exists(data, function(err,result){
      if(result){
        res.send("record exist")
        return
      }
      else{
        student.save(function (err) {
          if (err) return console.dir(err) 
        });
        // handleError(err);
        res.redirect('/registerStudent');
      }
    })

}

exports.getStudents = (req, res) => {
    var students = mongoose.model('Students')
    var query = students.find();
    query.exec(function(err, students){
        if(err){
            console.log("Error occoured: " + err.message);
            return;
        }
        console.dir(students)
        res.render('seeStudent', { title: 'Express', students: students });
    })
}

