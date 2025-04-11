import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await mysql.createConnection({
            host: 'mysql-specimencalc-specimen-calculator.b.aivencloud.com',
            user: 'avnadmin',
            password: 'AVNS_b4TTWhKCTg_vToQUTtJ',
            database: 'defaultdb',
            port: 28837,
        });

        const [rows] = await db.execute('SELECT * FROM specimen_entries ORDER BY id DESC');
        return NextResponse.json(rows);
    } catch (error: any) {
        console.error('Error fetching entries:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
