import React from "react";
import { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, getActivities}  from '../actions'
import {Link} from 'react-router-dom'
import CountryCard from './CountryCard'


function Home(){
    const dispatch = useDispatch();

    // Lo mismo que hacer mapStateToProps; solo retorna la parte del estado que me interesa
    const allCountries = useSelector((state) => state.countries)

    // const allActivities = useSelector((state) => state.activities)




    // Se divide el array por cantidad de paises (9)
    const currentCountries = allCountries.slice()


    // Me traigo del estado los países cuando el componente se monta con useEffect
    useEffect(() => {
        //setIsLoading(true)
        dispatch(getCountries(),
        dispatch(getActivities()));
       // setIsLoading(false)
    }, [dispatch]) //Si alguno de estos valores cambia, se vuelve a ejecutar
   //}, [dispatch, order]) //Si alguno de estos valores cambia, se vuelve a ejecutar

/* function handleClick = (event) => {
   event.preventDefault();
   dispatch(getCountries(order))
} */

/*     const handleClick = (event) => {
        event.preventDefault();
        dispatch(getCountries(order))
    } */


   return (
   <div>
       <Link to='/'>Countries of the World</Link>
        <h1>Create Activity</h1>
        {/* <button onClick={event => {handleClick(event)}}>Load Countries</button> */}

        <div>
        <select>
                {/* Filtros ascendente y descendente por orden alfabetico */}             
                <option>Sort by country name</option> 
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <select> 
                {/* Filtros ascendente y descendente por cantidad de poblacion */}
                <option>Sort by population</option> 
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
            </select>
            
            <select>
                {/* filtrar por continente y por tipo de actividad turística */} 
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Antarctic">Antartic</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            
            <select>
                <option value="All">All activities</option>
                {/* { allActivities && allActivities.map(activity => (
                    <option value={activity.name}>{activity.name}</option>
                ))} */}
            </select>

         
            
            {currentCountries?.map(country => (
            <Link to={'/home/' + country.id}>
                <CountryCard 
                name={country.name} 
                flags={country.flags} 
                continent={country.continent}
                id={country.id}
                population={country.population}
                key={country.id}/>
            </Link>
            ))}
            </div>
    </div>

   )}


export default Home;