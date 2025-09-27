import mysql from "mysql2/promise";

let connection;

const createConnection = async () => {
    if (!connection) {
        connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        })
    }

    return connection;
}

export default createConnection;