import React from 'react';
// import {Link} from 'react-router-dom'
// import CountryCard from './CountryCard';

const ActivityCard = (activity) => {
    return(
    <div>
        {activity && (
        <div>
            <p><strong>Activity: </strong>{activity.name}</p>
            <p><strong>Difficulty: </strong>{activity.difficulty}</p>
            <p><strong>Duration: </strong>{activity.duration}</p>
            <p><strong>Season: </strong>{activity.season}</p>
        </div>
        )}   
    </div>
    );
};

export default ActivityCard;