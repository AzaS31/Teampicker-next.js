import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './TeamTable.css';

const renderStars = (rating) => {
    const num = parseFloat(rating);
    if (isNaN(num)) return null;

    const fullStars = Math.floor(num);
    const hasHalfStar = num % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="star" />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="star" />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
    }

    return <div className="star-display">{stars}</div>;
};

const TeamTable = ({ teams }) => {
    if (!teams || teams.length === 0) return null;

    return (
        <div className="team-table-container">
            <table className="team-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Flag</th>
                        <th>League</th>
                        <th>Team</th>
                        <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(({ player, flag, league, team, stars }, index) => {
                        const flagSrc = `/images/${(flag || '').replace(/\s+/g, '_').toLowerCase()}.webp`;
                        const parsedStars = parseFloat(stars);

                        return (
                            <tr key={index}>
                                <td>{player}</td>
                                <td>
                                    <img
                                        src={flagSrc}
                                        alt={`Флаг ${flag}`}
                                        className="team-flag"
                                        onError={(e) => (e.target.style.display = 'none')}
                                    />
                                </td>
                                <td>{league}</td>
                                <td>{team}</td>
                                <td>
                                    <div className="flex items-center gap-1">
                                        {renderStars(parsedStars)}
                                        <span className="ml-2 text-sm text-gray-600">({parsedStars.toFixed(1)})</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamTable;
