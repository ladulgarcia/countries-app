import React from "react";


// function CountryCard({flags, name, region, id}){  
function CountryCard({flags,name,continent,population,id}){  
    return (
            <div>
            <img src={flags} alt="img not found" width='250px' height='125px'/>
            <h3>{name}</h3>
            <h5>{continent}</h5> {/* continent? */}
            <h5>{population}</h5>
            </div>
    );
}

export default CountryCard;