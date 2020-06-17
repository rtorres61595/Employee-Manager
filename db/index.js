const connection = require("./connection");

class DB{
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query("SELECT employee FROM top5000 GROUP BY artist HAVING count(*) > 1")
    }
}
module.export = new DB(connection)