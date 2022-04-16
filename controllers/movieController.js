var Movies = {

    getAllMovies: function (callback) {

        return db.query("Select * from task", callback);

    },
    getMoviesById: function (id, callback) {

        return db.query("select * from task where Id=?", [id], callback);
    },
    addMovies: function (Task, callback) {
        return db.query("Insert into task values(?,?,?)", [Task.Id, Task.Title, Task.Status], callback);
    },
    deleteMovies: function (id, callback) {
        return db.query("delete from task where Id=?", [id], callback);
    },
    updateMovies: function (id, Task, callback) {
        return db.query("update task set Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
    }

};
module.exports = Movies;