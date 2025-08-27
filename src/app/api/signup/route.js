import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

// ✅ Use environment variables for DB credentials
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(req) {
  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: "Missing email, password, or username" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await mysql.createConnection(dbConfig);

    // ✅ Check if email already exists
    const [existingUser] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // ✅ Insert new user
    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const userId = result.insertId;

    return NextResponse.json(
      {
        message: "User created successfully",
        userId,
        username,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
