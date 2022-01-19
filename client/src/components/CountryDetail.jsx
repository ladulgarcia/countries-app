import {React, useEffect} from 'react';
import { useParams } from 'react-router';
import { getCountry } from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from './ActivityCard'
import { Link } from 'react-router-dom';

const CountryDetail = () => {
    
    const {countryId} = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCountry(countryId));
      }, [dispatch, countryId]);

    const country = useSelector((state) => state.country)

    return(
        <div>
            <div>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            </div>
           <img src={country.flags} alt={country.name}/>
           <div>
             <p><strong>País:</strong> {country.name}</p>
             <p><strong>Continent:</strong>{country.continent}</p>
             <p><strong>Capital:</strong> {country.capital}</p>
             <p><strong>Subregion:</strong> {country.subregion}</p>
             <p><strong>Area:</strong> {country.area} km2</p>
             <p><strong>Population:</strong> {country.population} population</p>
             <div>
             {country.activities && country.activities.map((activity) => 
             <ActivityCard 
                name={activity.name} 
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season} />)}
             </div>
            </div>  
        </div>
    );
}

export default CountryDetail;