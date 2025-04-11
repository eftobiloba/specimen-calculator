// lib/db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'sql8.freesqldatabase.com',
    user: 'sql8772622',
    password: '7RE3fJaCqB',
    database: 'sql8772622',
    port: 3306,
});
