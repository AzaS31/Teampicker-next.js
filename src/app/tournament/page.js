'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PlayerInputList from '@/components/PlayerInputList';
import TeamTable from '@/components/TeamTable';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './TournamentPage.css';

const Select = dynamic(() => import('react-select'), { ssr: false });

const leagueOptions = [
  { value: 'All', label: 'All leagues' },
  { value: 'Premier League', label: 'Premier League' },
  { value: 'La Liga', label: 'La Liga' },
  { value: 'Serie A', label: 'Serie A' },
  { value: 'Bundesliga', label: 'Bundesliga' },
  { value: 'Ligue 1', label: 'Ligue 1' },
];

const starOptions = [
  { value: 'Any', label: 'Any stars' },
  { value: 3.5, label: '3.5' },
  { value: 4, label: '4' },
  { value: 4.5, label: '4.5' },
  { value: 5, label: '5' },
];

const TournamentPage = () => {
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState(['', '', '']);
  const [leagues, setLeagues] = useState([]);
  const [stars, setStars] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPlayerCount(count);

    const updatedNames = Array.from({ length: count }, (_, i) => playerNames[i] || '');
    setPlayerNames(updatedNames);
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
  };

  const handleSubmit = async () => {
    if (playerNames.some((name) => !name.trim())) {
      alert('Please enter a name for each player.');
      return;
    }

    setLoading(true);
    setResults([]);

    const selectedLeagues =
      leagues.length === 1 && leagues[0].value === 'All'
        ? []
        : leagues.map((l) => l.value);

    const selectedStars =
      stars.length === 1 && stars[0].value === 'Any'
        ? []
        : stars.map((s) => parseFloat(s.value));

    try {
      // Искусственная задержка перед отправкой запроса
      await new Promise((res) => setTimeout(res, 300));

      const response = await fetch('/api/tournament-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          players: playerNames,
          leagues: selectedLeagues,
          stars: selectedStars,
        }),
      });

      const data = await response.json();

      if (data.results) {
        setResults(data.results);
      } else {
        alert(data.error || 'Error fetching data from the server');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tournament-page page-wrapper">
      <Header />
      <main className="main-content-tournament">
        <div className="tournament-container">
          <h1>Random Teams for Tournament</h1>

          <div className="form-group">
            <label>Number of Players (3-32):</label>
            <input
              type="number"
              min="3"
              max="32"
              value={playerCount}
              onChange={handleCountChange}
              className="number-input"
            />
          </div>

          <PlayerInputList
            playerCount={playerCount}
            playerNames={playerNames}
            onNameChange={handleNameChange}
          />

          <div className="form-group">
            <label>Select Leagues:</label>
            <Select
              isMulti
              isSearchable={false}
              options={leagueOptions}
              value={leagues}
              onChange={setLeagues}
              placeholder="All leagues"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div className="form-group">
            <label>Select Star Ratings:</label>
            <Select
              isMulti
              isSearchable={false}
              options={starOptions}
              value={stars}
              onChange={setStars}
              placeholder="Any stars"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'GET'}
          </button>

          {results.length > 0 && (
            <div className="results-section">
              <h2>Results:</h2>
              <TeamTable teams={results} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TournamentPage;
