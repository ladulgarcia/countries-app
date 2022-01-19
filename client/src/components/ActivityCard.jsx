import React from 'react';

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