import { NextResponse } from 'next/server';
import { db } from '../../../lib/db'; // импортируем db

const buildQuery = (leagues = [], stars = [], excludedTeams = []) => {
  let query = `
    SELECT teams.*, c.name AS country_name, leagues.name AS league_name
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

  if (excludedTeams.length > 0) {
    const placeholders = excludedTeams.map(() => '?').join(',');
    conditions.push(`teams.team_name NOT IN (${placeholders})`);
    params.push(...excludedTeams);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY RAND() LIMIT 1';

  return { query, params };
};

export async function POST(request) {
  try {
    let { players, leagues, stars } = await request.json();

    // Normalize "All" or "Any" values (so filtering is skipped)
    if (leagues === 'All' || leagues.includes('All')) leagues = [];
    if (stars === 'Any' || stars.includes('Any')) stars = [];

    if (!Array.isArray(players) || players.length < 3 || players.length > 32) {
      return NextResponse.json({ error: 'Player count must be between 3 and 32.' }, { status: 400 });
    }

    const results = [];
    const usedTeams = [];

    for (const playerName of players) {
      const { query, params } = buildQuery(leagues, stars, usedTeams);
      const [rows] = await db.query(query, params);

      const team = rows[0];
      if (!team) {
        return NextResponse.json(
          { error: `Not enough teams available for all players. Only assigned ${results.length}.` },
          { status: 400 }
        );
      }

      results.push({
        player: playerName,
        team: team.team_name,
        league: team.league_name,
        flag: team.country_name,
        stars: team.star_rating,
      });

      usedTeams.push(team.team_name);
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error('Team generation error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

