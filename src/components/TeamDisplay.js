// TeamDisplay.jsx
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} color="#FFD700" />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" color="#FFD700" />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} color="#FFD700" />);
    }

    return stars;
};

const TeamDisplay = ({ team }) => {
    if (!team) {
        return <div>Loading team...</div>;
    }

    const flagSrc = `/images/${(team.country_name || '').replace(/\s+/g, '_').toLowerCase()}.webp`;
    const starIcons = renderStars(parseFloat(team.star_rating));

    return (
        <div className="team-info fade-in">
            <img
                className="flag appear-step step-1"
                src={flagSrc}
                alt={`Flag of ${team.country_name}`}
            />
            <h2 className="team_name appear-step step-2">{team.team_name}</h2>
            <div className="stars appear-step step-3" style={{ display: 'flex', gap: '4px' }}>
                {starIcons}
            </div>
        </div>
    );
};

export default TeamDisplay;
