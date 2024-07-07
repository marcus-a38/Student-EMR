import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'marcus',
  password: 'password',
  database: 'fsu-emr',
});

export default pool;