import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Example config, replace with your actual credentials
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// ✅ GET: Check enrollment OR Fetch AP Top 25 Rankings
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    console.log('userId:', userId);

    // 🔍 If userId is passed, check enrollment
    if (userId) {
      console.log('Connecting to DB...');
      const connection = await mysql.createConnection(dbConfig);
      console.log('Connected!');
      const [rows] = await connection.execute(
        'SELECT cfb_enrolled FROM sports WHERE user_id = ?',
        [userId]
      );
      console.log('Query result:', rows);
      await connection.end();

      const enrolled = rows[0]?.cfb_enrolled === 1;
      console.log('Enrolled:', enrolled);
      return NextResponse.json({ enrolled });
    }

    // 📊 No userId = Fetch AP Top 25 Rankings from ESPN
    console.log('Fetching ESPN rankings...');
    const espnRes = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings'
    );

    if (!espnRes.ok) {
      console.error('❌ Failed to fetch rankings from ESPN');
      return NextResponse.json({ error: 'Failed to fetch rankings' }, { status: 502 });
    }

    const espnData = await espnRes.json();
    console.log('ESPN API data:', espnData);
    const rankings = espnData.rankings.find(
      (r) => r.name === 'AP Top 25'
    )?.ranks || [];

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('❌ Error in GET handler:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
