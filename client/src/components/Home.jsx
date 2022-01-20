import React from "react";
import { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getCountries, getActivities, filterByContinent, filterByActivity, orderName, orderPopulation}  from '../actions'
import {Link} from 'react-router-dom'
import CountryCard from './CountryCard'
import Pagination from "./Pagination"
import NavBar from "./NavBar";

// Estilos
import styles from './Home.module.css'

function Home(){
    const dispatch = useDispatch();

    // Lo mismo que hacer mapStateToProps; solo retorna la parte del estado que me interesa
    const allCountries = useSelector((state) => state.countries)
    const allActivities = useSelector((state) => state.activities)

    // Mientras se cargan los paises
    const[isLoading, setIsLoading] = useState(true);

    // Estado local con la pagina actual con un estado que me setee la página actual; seteado en 1
    const [currentPage, setCurrentPage] = useState(1) // Página actual arranca/seteada en 1
    const [countriesPerPage] = useState(9) // Cantidad de paises por pagina
    const IndexOfLastCountry = currentPage * countriesPerPage  //Index of IndexOfLastCountry: currentPage * 9 = 9
    const IndexOfFirstCountry = IndexOfLastCountry - countriesPerPage  // Index of IndexOfFirstCountry: 9 - 9 = 0
   
    // REVISAR ESTA PARTE
    const currentCountries = allCountries.slice(IndexOfFirstCountry, IndexOfLastCountry)// Dividir el array según cantidad de paises solicitados (9)
    console.log(currentCountries)
    const [order, setOrder] = useState('')
    console.log('orderNav:' +order)
    //const [orderPop, setOrderPop] = useState('')

    const pagination = (PageNumber)=>{ // me lleva al renderizado
        setCurrentPage(PageNumber); //Setea el número de la página a mostrar
    };

    // Me traigo del estado los países cuando el componente se monta con useEffect
    useEffect(() => {
        setIsLoading(true)
        dispatch(getCountries(),
        dispatch(getActivities()));
        setIsLoading(false)
    }, [dispatch, order]) //Si alguno de estos valores cambia, se vuelve a ejecutar
    
    const handleClick = (event) => { //Resetea el State, trae todos los países de nuevo
        event.preventDefault();
        dispatch(getCountries(order))
    }

    function handleSort(event){
        //console.log('handleSort')
        event.preventDefault();
        dispatch(orderName(event.target.value));
        setCurrentPage(1); // setea la pagina principal
        //console.log('order:' +order)
        setOrder(`${event.target.value}`) // setear para que desde el front se haga el ordenamiento
        //console.log(`${event.target.value}`)
    }

    function handleSortPop(event){
        //console.log('handleSort')
        event.preventDefault();
        dispatch(orderPopulation(event.target.value));
        setCurrentPage(1); // setea la pagina principal
        setOrder(`${event.target.value}`) // setear para que desde el front se haga el ordenamiento
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
        <header>
        <h1>Countries of the World</h1>
        <Link to='/activity' className={styles.btn}>Create Activity</Link>
        {/* <button onClick={event => {handleClick(event)}}>Load Countries</button> */}
        </header>
        
        {/* Me traigo el NavBar.jsx */}
        <NavBar/>


        <select onChange={event => handleSort(event)}>
                {/* Filtros ascendente y descendente por orden alfabetico */}             
                <option>Sort by name</option> 
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <select onChange={event => handleSortPop(event)}> 
                {/* Filtros ascendente y descendente por cantidad de poblacion */}
                <option>Sort by population</option> 
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
            </select>
            
            <select onChange={event => handleFilterContinent(event)}>
                {/* filtrar por continente y por tipo de actividad turística */} 
                <option value="All">All Continents</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Antarctic">Antartic</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            
            <select onChange={event => handleFilterActivity(event)}>
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
            { isLoading ? <img src='../images/loading.gif' alt='Loading...'/> :
            <ul className={styles.countriesGrid}>
            { 
            // console.log(currentCountries)  
            currentCountries?.map(country => (
            //currentCountries?.map(country => (

            <Link to={'/home/' + country.id}>
                <CountryCard 
                name={country.name} 
                flag={country.flag} 
                continent={country.continent}
                id={country.id}
                population={country.population}
                key={country.id}
                />
            </Link>
                ))}
            </ul>
            }

            {/* <Pagination 
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                pagination={pagination}
            /> */}

        <button onClick={(event) => {handleClick(event);
        }}
          >Reload
        </button>
    </div>
   )}


export default Home;