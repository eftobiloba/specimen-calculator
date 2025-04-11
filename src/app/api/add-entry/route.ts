import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  // Parse the incoming JSON request body
  const { username, microscopeSize, actualSize } = await request.json();

  // Access database credentials from environment variables
  const dbHost = process.env.HOST;
  const dbUser = process.env.USER;
  const dbPassword = process.env.PASSWORD;
  const dbDatabase = process.env.DATABASE;
  const dbPort = parseInt(process.env.PORT || '3306', 10); // Default to 3306 if not specified

  // Check if all environment variables are set
  if (!dbHost || !dbUser || !dbPassword || !dbDatabase || !dbPort) {
    return NextResponse.json(
      { message: 'Missing database configuration in environment variables' },
      { status: 500 }
    );
  }

  try {
    // Create a database connection using environment variables
    const db = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbDatabase,
      port: dbPort,
    });

    // Create the table if it doesn't exist
    await db.execute(
      'CREATE TABLE IF NOT EXISTS specimen_entries (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), microscopeSize FLOAT, actualSize FLOAT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
    );

    // Insert the new entry into the database
    await db.execute(
      'INSERT INTO specimen_entries (username, microscopeSize, actualSize) VALUES (?, ?, ?)',
      [username, microscopeSize, actualSize]
    );

    // Return success message
    return NextResponse.json({ message: 'Saved successfully!' });
  } catch (error) {
    console.error('Error during database operation:', error);
    return NextResponse.json({ message: 'Error saving data.' }, { status: 500 });
  }
}
