var path = require('path');
const data = {
    student: require(path.join(__dirname, '../data/Student/Student.json')),
    setStudent: function (data) {
        this.student = data;
    }

};


const getAllStudents = (req, res) => {
    res.json(data.student);
}
const createStudents = (req, res) => {
    const newstudent = {
        "ID": data.student[data.student.length - 1].id + 1 || 1,
        "LastName": req.body.lastname,
        "FirstName": req.body.firstname,
        "City": req.body.city,
        "State": req.body.state,
        "Gender": req.body.gender,
    }
    data.setStudent([...data.student, newstudent]);
    res.status(201).json(data.student);
}
const updateStudents = (req, res) => {
    const student = data.student.find(stud => parseInt(stud.ID) === parseInt(req.body.id));
    if (!student) return res.status(400).json({ error: 'Student not found in this ID' })
    if (req.body.FirstName) student.FirstName = req.body.firstname
    if (req.body.LastName) student.LastName = req.body.lastname
    if (req.body.City) student.City = req.body.city
    if (req.body.State) student.State = req.body.state
    if (req.body.Gender) student.Gender = req.body.gender

    const filteredArray = data.student.filter(stud => parseInt(stud.ID) !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, student];
    data.setStudent(unsortedArray.sort((a, b) => a.ID > b.ID ? 1 : a.ID < b.ID ? -1 : 0))
    res.status(201).json(data.student);


}
const deleteStudents = (req, res) => {
    const student = data.student.find(stud => parseInt(stud.ID) === parseInt(req.body.id));
    if (!student) return res.status(400).json({ error: 'Student not found in this ID' })
    const filteredArray = data.student.filter(stud => stud.ID !== parseInt(req.body.id));

    data.setStudent([...filteredArray])
    res.status(201).json(data.student);
}
const getStudentsById = (req, res) => {

    const student = data.student.find(stud => parseInt(stud.ID) === parseInt(req.params.id));
    //console.log(data.student);
    if (!student) return res.status(400).json({ error: 'Student not found in this ID' })
    res.json(student);
}

module.exports = {
    getStudentsById, getAllStudents, createStudents, updateStudents,
    deleteStudents
}