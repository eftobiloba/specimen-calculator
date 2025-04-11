import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

// Define a type for the rows to match the structure of the data you're retrieving
type SpecimenEntry = {
  id: number;
  username: string;
  microscope_size: number;
  actual_size: number;
  created_at: string;
};

export async function GET() {
  try {
    // Access credentials from environment variables
    const dbHost = process.env.HOST;
    const dbUser = process.env.USER;
    const dbPassword = process.env.PASSWORD;
    const dbDatabase = process.env.DATABASE;
    const dbPort = parseInt(process.env.PORT || '3306', 10); // Default to 3306 if not specified

    if (!dbHost || !dbUser || !dbPassword || !dbDatabase || !dbPort) {
      throw new Error('Missing database configuration in .env file');
    }

    // Establish database connection using environment variables
    const db = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbDatabase,
      port: dbPort,
    });

    const [rows] = await db.execute('SELECT * FROM specimen_entries ORDER BY id DESC');

    // Type-cast rows to the expected type (SpecimenEntry[])
    return NextResponse.json(rows as SpecimenEntry[]);
  } catch (error: unknown) {
    // Narrow down the error type to Error if it's an instance of Error
    if (error instanceof Error) {
      console.error('Error fetching entries:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // If it's not an instance of Error, handle it as an unknown error
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
