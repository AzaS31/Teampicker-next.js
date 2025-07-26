import React from "react";
import './PlayerInputList.css';

const PlayerInputList = ({ playerCount, playerNames, onNameChange, error }) => {
    return (
        <div className="player-input-list">
            {Array.from({ length: playerCount }, (_, index) => (
                <div key={index} className="player-input-row">
                    <label htmlFor={`player-${index}`} className="player-input-label">
                        Player {index + 1}:
                    </label>
                    <input
                        id={`player-${index}`}
                        type="text"
                        value={playerNames[index] || ""}
                        onChange={(e) => onNameChange(index, e.target.value)}
                        className="player-input-field"
                        placeholder="Enter name"
                    />
                </div>
            ))}
            {error && (
                <div className="player-input-error">
                    Please enter names for all players
                </div>
            )}
        </div>
    );
};

export default PlayerInputList;
