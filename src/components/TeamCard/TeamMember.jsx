import React from "react";
import "./TeamMember.css";

const TeamMember = ({ name, position, imageSrc, description }) => {
  return (
    <div className="team-member">
      <div className="member-image">
        <img src={imageSrc} alt={name} />
        <div className="member-overlay">
          <h3 className="team-member-heading">{name}</h3>
          <p className="team-member-description">{description}</p>
        </div>
      </div>
      <h3 className="team-member-heading">{name}</h3>
      <p className="team-member-position">{position}</p>
    </div>
  );
};

export default TeamMember;
