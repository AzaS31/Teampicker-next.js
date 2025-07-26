'use client';

import React, { useState, useEffect, useRef } from 'react';
import TeamDisplay from './TeamDisplay';
import ClientOnlySelect from './ClientOnlySelect';

const leagueOptions = [
    { value: 'Premier League', label: 'Premier League' },
    { value: 'La Liga', label: 'La Liga' },
    { value: 'Bundesliga', label: 'Bundesliga' },
    { value: 'Seria A', label: 'Serie A' },
    { value: 'Ligue 1', label: 'Ligue 1' },
];

const starOptions = [
    { value: '3.5', label: '3.5' },
    { value: '4', label: '4' },
    { value: '4.5', label: '4.5' },
    { value: '5', label: '5' },
];

const TeamSelector = () => {
    const [leaguePlayer1, setLeaguePlayer1] = useState([]);
    const [starRatingPlayer1, setStarRatingPlayer1] = useState([]);
    const [leaguePlayer2, setLeaguePlayer2] = useState([]);
    const [starRatingPlayer2, setStarRatingPlayer2] = useState([]);


    const [teamDataPlayer1, setTeamDataPlayer1] = useState(null);
    const [teamDataPlayer2, setTeamDataPlayer2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);

    const clickSoundRef = useRef(null);
    const getSoundRef = useRef(null);
    const spinSoundRef = useRef(null);

    useEffect(() => {
        clickSoundRef.current = new Audio('/sounds/click-sound.mp3');
        getSoundRef.current = new Audio('/sounds/sound-pass.mp3');
        spinSoundRef.current = new Audio('/sounds/sound-spin.mp3');
    }, []);

    const safePlay = (ref) => {
        const audio = ref.current;
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch((err) => console.warn('Sound error:', err));
        }
    };

    const fetchTeams = async () => {
        safePlay(getSoundRef);
        safePlay(spinSoundRef);
        setSpinning(true);
        setLoading(true);
        setTeamDataPlayer1(null);
        setTeamDataPlayer2(null);

        const query = new URLSearchParams({
            leaguePlayer1: leaguePlayer1.map(l => l.value).join(',') || 'All',
            star_ratingPlayer1: starRatingPlayer1.map(s => s.value).join(',') || 'Any',
            leaguePlayer2: leaguePlayer2.map(l => l.value).join(',') || 'All',
            star_ratingPlayer2: starRatingPlayer2.map(s => s.value).join(',') || 'Any',
        });

        try {
            const res = await fetch(`/api/random-teams?${query}`);
            const data = await res.json();

            setTimeout(() => {
                setTeamDataPlayer1(data[0]);
                setTeamDataPlayer2(data[1]);
                setSpinning(false);
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Error fetching teams:', error);
            alert('An error occurred while fetching teams. Please try again later.');
            setSpinning(false);
            setLoading(false);
        }
    };

    return (
        <div className="teams-container">
            <div className="teams-wrapper">
                {/* Player 1 */}
                <div className="team-block">
                    <div className="team-emblem">
                        {spinning ? (
                            <div className="spinner"></div>
                        ) : teamDataPlayer1 ? (
                            <TeamDisplay team={teamDataPlayer1} />
                        ) : (
                            <span className="question-mark">?</span>
                        )}
                    </div>
                    <div className="team-select">
                        <label style={{ color: 'white' }}>Player 1</label>
                        <ClientOnlySelect
                            isMulti
                            isSearchable={false}
                            options={leagueOptions}
                            value={leaguePlayer1}
                            onChange={(selected) => {
                                setLeaguePlayer1(selected);
                                safePlay(clickSoundRef);
                            }}
                            placeholder="All leagues"
                        />
                        <ClientOnlySelect
                            isMulti
                            isSearchable={false}
                            options={starOptions}
                            value={starRatingPlayer1}
                            onChange={(selected) => {
                                setStarRatingPlayer1(selected);
                                safePlay(clickSoundRef);
                            }}
                            placeholder="Any stars"
                        />
                    </div>
                </div>

                {/* Player 2 */}
                <div className="team-block">
                    <div className="team-emblem">
                        {spinning ? (
                            <div className="spinner"></div>
                        ) : teamDataPlayer2 ? (
                            <TeamDisplay team={teamDataPlayer2} />
                        ) : (
                            <span className="question-mark">?</span>
                        )}
                    </div>
                    <div className="team-select">
                        <label style={{ color: 'white' }}>Player 2</label>
                        <ClientOnlySelect
                            isMulti
                            isSearchable={false}
                            options={leagueOptions}
                            value={leaguePlayer2}
                            onChange={(selected) => {
                                setLeaguePlayer2(selected);
                                safePlay(clickSoundRef);
                            }}
                            placeholder="All leagues"
                        />
                        <ClientOnlySelect
                            isMulti
                            isSearchable={false}
                            options={starOptions}
                            value={starRatingPlayer2}
                            onChange={(selected) => {
                                setStarRatingPlayer2(selected);
                                safePlay(clickSoundRef);
                            }}
                            placeholder="Any stars"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="button">
                <button
                    className={`get_btn ${loading ? 'disabled' : ''}`}
                    onClick={fetchTeams}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'GET'}
                </button>
            </div>
        </div>
    );
};

export default TeamSelector;
