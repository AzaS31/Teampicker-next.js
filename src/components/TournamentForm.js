'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PlayerInputList from '@/components/PlayerInputList';
import TeamTable from '@/components/TeamTable';
import './TournamentForm.css';

const Select = dynamic(() => import('react-select'), { ssr: false });

const leagueOptions = [
    { value: 'Premier League', label: 'Premier League' },
    { value: 'La Liga', label: 'La Liga' },
    { value: 'Serie A', label: 'Serie A' },
    { value: 'Bundesliga', label: 'Bundesliga' },
    { value: 'Ligue 1', label: 'Ligue 1' },
];

const starOptions = [
    { value: 3.5, label: '3.5' },
    { value: 4, label: '4' },
    { value: 4.5, label: '4.5' },
    { value: 5, label: '5' },
];

const TournamentForm = () => {
    const [playerCount, setPlayerCount] = useState(3);
    const [playerNames, setPlayerNames] = useState(['', '', '']);
    const [leagues, setLeagues] = useState([]);
    const [stars, setStars] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCountChange = (e) => {
        const value = e.target.value;

        // Если поле пустое, разрешаем временно оставить его пустым
        if (value === '') {
            setPlayerCount('');
            setPlayerNames(Array.from({ length: playerCount }, (_, i) => playerNames[i] || ''));
            return;
        }

        const count = parseInt(value);

        // Если значение некорректное (NaN), ничего не делаем
        if (isNaN(count)) {
            return;
        }

        // Ограничиваем значение между 3 и 32
        const clampedCount = Math.min(Math.max(count, 3), 32);
        setPlayerCount(clampedCount);
        const updatedNames = Array.from({ length: clampedCount }, (_, i) => playerNames[i] || '');
        setPlayerNames(updatedNames);
    };

    const handleCountBlur = () => {
        // При потере фокуса, если поле пустое или NaN, устанавливаем значение по умолчанию (3)
        if (playerCount === '' || isNaN(playerCount)) {
            setPlayerCount(3);
            setPlayerNames(Array.from({ length: 3 }, (_, i) => playerNames[i] || ''));
        }
    };

    const handleNameChange = (index, value) => {
        const updatedNames = [...playerNames];
        updatedNames[index] = value;
        setPlayerNames(updatedNames);
    };

    const handleSubmit = async () => {
        // Проверяем playerCount перед отправкой
        if (playerCount === '' || isNaN(playerCount)) {
            setPlayerCount(3);
            setPlayerNames(Array.from({ length: 3 }, (_, i) => playerNames[i] || ''));
            return;
        }

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
                    onBlur={handleCountBlur}
                    className="number-input"
                />
            </div>

            <PlayerInputList
                playerCount={playerCount === '' ? 3 : playerCount}
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
    );
};

export default TournamentForm;