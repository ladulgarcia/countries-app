import React from "react";
import { Link } from "react-router-dom";


// function CountryCard({flags, name, region, id}){  
function CountryCard({flags, name, continent, population, id}){  
    return(
        <div>
                <Link to={'/home/' + id}>
                <img src={flags} alt="img not found" width='250px' height='125px'/>
                <h3>{name}</h3>
                <h5>{continent}</h5> {/* continent? */}
                <h5>{population}</h5>
                </Link>
        </div>
    );
}

export default CountryCard;