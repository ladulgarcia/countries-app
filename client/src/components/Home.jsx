import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, getActivities, filterByContinent, filterByActivity, orderName}  from '../actions'
import {Link} from 'react-router-dom'
import CountryCard from './CountryCard'
import Pagination from "./Pagination"


function Home(){
    const dispatch = useDispatch();

    // Lo mismo que hacer mapStateToProps; solo retorna la parte del estado que me interesa
    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)

    // Estado local con la pagina actual con un estado que me setee la página actual; seteado en 1
    const [currentPage, setCurrentPage] = useState(1) // Página actual arranca en 1
    const [countriesPerPage, setcountriesPerPage] = useState(9) // Cantidad de paises por pagina
    const IndexOfLastCountry = currentPage * countriesPerPage  //Index of IndexOfLastCountry: currentPage * 9 = 9
    const IndexOfFirstCountry = IndexOfLastCountry - countriesPerPage  // Index of IndexOfFirstCountry: 9 - 9 = 0
    const currentCountries = allCountries.slice(IndexOfFirstCountry, IndexOfLastCountry)// Dividir el array según cantidad de paises solicitados (9)

    const [order, setOrder] = useState('')

    const pagination = (totalPages)=>{ // me lleva al renderizado
        setCurrentPage(totalPages);
    }
    // const pagination = (pageNumber)=>{
    //     setCurrentPage(PageNumber);
    // }


    // Me traigo del estado los países cuando el componente se monta con useEffect
    useEffect(() => {
        //setIsLoading(true)
        dispatch(getCountries(order),
        dispatch(getActivities()));
       // setIsLoading(false)
    }, [dispatch, order]) //Si alguno de estos valores cambia, se vuelve a ejecutar


/* function handleClick = (event) => {
   event.preventDefault();
   dispatch(getCountries(order))
} */

/*     const handleClick = (event) => {
        event.preventDefault();
        dispatch(getCountries(order))
    } */

    const changeOrder = (event) => {
        event.preventDefault()
        setOrder(event.target.value)
    }

    function handleSort(event){
        event.preventDefault();
        dispatch(orderName(event.target.value));
        setCurrentPage(1); // setea la pagina principal
        setOrder(`Order ${event.target.value}`) // setear para que desde el front se haga el ordenamiento
    }

    function handleFilterContinent(event){
        // Se toma como payload el value de la option que elija el usuario
        event.preventDefault();
        dispatch(filterByContinent(event.target.value));
        setCurrentPage(1);
    }

    function handleFilterActivity(event){
        // Se toma como payload el value de la option que elija el usuario
        dispatch(filterByActivity(event.target.value))
        console.log(event.target.value)
    }


   return (
    <div>
       <Link to='/'>Countries of the World</Link>
        <h1>Create Activity</h1>
        {/* <button onClick={event => {handleClick(event)}}>Load Countries</button> */}

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
                { allActivities && allActivities.map(activity => (
                    <option value={activity.name}>{activity.name}</option>
                ))}
            </select>

            <Pagination 
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                pagination={pagination}
            />

            {/* Mapeo de currentCountries, solo toma lo que me devuelve el paginado */}
            {currentCountries?.map(country => {
                return(
            // <fragment>
            <Link to={'/home/' + country.id}>
                <CountryCard 
                name={country.name} 
                flags={country.flags} 
                continent={country.continent}
                id={country.id}
                population={country.population}
                key={country.id}/>
            </Link>
            // </fragment>
                );
                })
            }
           
    </div>
   )}


export default Home;