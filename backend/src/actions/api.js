import mysql, {PoolConnection} from 'mysql';
import pool from '../db';

export default async function query() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (err, rows) => {
      connection.release();
      if (err) throw err;
      return rows;
    });
  });
}