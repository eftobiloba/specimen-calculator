import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
    const { username, microscopeSize, actualSize } = await request.json();

    const db = await mysql.createConnection({
        host: 'mysql-specimencalc-specimen-calculator.b.aivencloud.com',
        user: 'avnadmin',
        password: 'AVNS_b4TTWhKCTg_vToQUTtJ',
        database: 'defaultdb',
        port: 28837,
    });

    try {
        const [rows] = await db.execute(
        'CREATE TABLE IF NOT EXISTS specimen_entries (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), microscopeSize FLOAT, actualSize FLOAT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
        );

        await db.execute(
        'INSERT INTO specimen_entries (username, microscopeSize, actualSize) VALUES (?, ?, ?)',
        [username, microscopeSize, actualSize]
        );

        return NextResponse.json({ message: 'Saved successfully!' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error saving data.' }, { status: 500 });
    } finally {
        db.end();
    }
}
