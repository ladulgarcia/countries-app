import {GET_COUNTRIES, GET_COUNTRY, GET_BY_NAME, GET_ACTIVITY, ORDER_BY_NAME, FILTER_CONTINENT, FILTER_ACTIVITY, ORDER_BY_POPULATION} from '../actions'

const initialState = {// Estado para renderizar, se usa para hacer el filtrado
    countries : [],
    allCountries : [], // Estado soporte que siempre tiene todos los paises 
    activities : [],
    country: []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            } 
        case GET_BY_NAME:
            console.log("rootReducer action.payload:")
            console.log(action.payload)
            return {
                ...state,
                //currentCountries: action.payload
                countries: action.payload
            }      
        case GET_COUNTRY: 
            return {
            ...state,
            country: action.payload
        }    
        case GET_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }    
        case 'POST_ACTIVITY':
            return{
                ...state
            }
        case ORDER_BY_NAME:
            let sortedCountries = action.payload === 'asc' ?
            state.countries.sort((a, b) => a.name.localeCompare(b.name)) :
            state.countries.sort((a, b) => b.name.localeCompare(a.name));
             return{
                ...state,
                countries: sortedCountries
            }  

        case ORDER_BY_POPULATION:
            let sortedCountriesPop = action.payload === 'asc' ?
            state.countries.sort((a, b) => {
                if (a.population > b.population) return 1;
                if(a.population < b.population) return -1;
                return 0;
            }) :
            state.countries.sort((a, b) => {
                if (a.population > b.population) return -1;
                if(a.population < b.population)return 1;
                return 0;
            });
                return{
                ...state,
                countries: sortedCountriesPop
            } 
            

        case FILTER_CONTINENT:
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'All' ? // si el valor proporcionado = All entonces utilizar allCOuntries, caso countrario, filtra
            allCountries : allCountries.filter(country => // para cada country ver si 
                country.continent === action.payload)  // action.payload = valor proporcionado
            return{
                ...state,
                countries : continentFilter
            }   
        case FILTER_ACTIVITY:
            const allCountriesAct = state.allCountries // me devuelve todos los países
            const activitiesFilter = action.payload === 'All' ? //devuelve allCountriesAct
            allCountriesAct : allCountriesAct.filter(country => // si no, me los devuelve filtrados
                country.activities && country.activities.map(el => el.name).includes(action.payload))
            return{
                ...state,
                countries: activitiesFilter //
            }     
        default :
        return state;    
    }
}

export default rootReducer;