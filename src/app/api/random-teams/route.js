import { db } from '@/lib/db';

const buildQuery = (leagues = [], stars = [], excludeTeam = null) => {
  let query = `
    SELECT teams.*, c.name AS country_name
    FROM teams
    JOIN leagues ON teams.league_id = leagues.id
    JOIN countries c ON teams.country_id = c.id
  `;

  const params = [];
  const conditions = [];

  if (leagues.length > 0) {
    const placeholders = leagues.map(() => '?').join(',');
    conditions.push(`leagues.name IN (${placeholders})`);
    params.push(...leagues);
  }

  if (stars.length > 0) {
    const placeholders = stars.map(() => '?').join(',');
    conditions.push(`teams.star_rating IN (${placeholders})`);
    params.push(...stars.map(parseFloat));
  }

  if (excludeTeam) {
    conditions.push('teams.team_name != ?');
    params.push(excludeTeam);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY RAND() LIMIT 1';
  return { query, params };
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const parseList = (key) => {
    const raw = searchParams.get(key);
    if (!raw || raw === 'All' || raw === 'Any') return [];
    return raw.split(',').map(item => item.trim()).filter(Boolean);
  };

  const leaguePlayer1 = parseList('leaguePlayer1');
  const starPlayer1 = parseList('star_ratingPlayer1');
  const leaguePlayer2 = parseList('leaguePlayer2');
  const starPlayer2 = parseList('star_ratingPlayer2');

  if (
    !searchParams.has('leaguePlayer1') || !searchParams.has('star_ratingPlayer1') ||
    !searchParams.has('leaguePlayer2') || !searchParams.has('star_ratingPlayer2')
  ) {
    return Response.json({ message: 'All parameters are required.' }, { status: 400 });
  }

  try {
    const query1 = buildQuery(leaguePlayer1, starPlayer1);
    const [results1] = await db.query(query1.query, query1.params);

    if (results1.length === 0) {
      return Response.json({ message: 'No team found for Player 1.' }, { status: 404 });
    }

    const teamPlayer1 = results1[0].team_name;
    const query2 = buildQuery(leaguePlayer2, starPlayer2, teamPlayer1);
    const [results2] = await db.query(query2.query, query2.params);

    if (results2.length === 0) {
      return Response.json({ message: 'No team found for Player 2.' }, { status: 404 });
    }

    return Response.json([results1[0], results2[0]], { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
