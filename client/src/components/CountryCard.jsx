import React from "react";
import { Link } from "react-router-dom";


// function CountryCard({flags, name, region, id}){  
function CountryCard({flag, name, continent, population, id}){  
    return(
        <div>
                <Link to={'/home/' + id}>
                <img src={flag} alt="img not found" width='150px' height='100px'/>
                <h3>{name}</h3>
                <h5>{continent}</h5> {/* continent? */}
                <h5>{population}</h5>
                </Link>
        </div>
    );
}

export default CountryCard;