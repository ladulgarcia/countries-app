import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, postActivity } from '../actions'
import { Link } from 'react-router-dom'
//import { Link, useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router'

// Estilos
import styles from './CreateActivity.module.css'

// Validación de estados con react
function validate(input) {
    let errors = {};
    if(!input.name){ // Hay un name?
        errors.name = "Name required"; 
    }else if(!input.difficulty){ // hay nivel de dificultad?
        errors.difficulty = "Difficulty required";
    }else if(!input.duration){ // so on...
        errors.duration = "Activity time needed";
    }else if(!input.season){
        errors.season = "Season needed";
    }else if(input.countries.length <= 0){
        errors.countries = "Select countries for activity created";
    }
    return errors;
}

//const CreateActivity = () => {
//function CreateActivity() {
    export default function CreateActivity() {

    const dispatch = useDispatch()
    const history = useNavigate()
    
    // me traigo a los countries y le digo que me traiga el state.countries
    const countries = useSelector((state) => state.countries)
    console.log(countries)

    const [errors, setErrors] = useState({})

    // hago un objeto que le pase lo que necesita el post de reducers
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season:'',
        countries: [] // countryID: []
    })

    function handleChange(e){ // Le agregamos el e.target.value (lo que vamos modificando) al input actual 
        setInput({ // setea el estado/input
            ...input, // se trae todo lo que ya tenía 
            [e.target.name] : e.target.value // seteamelo en  un target value de lo que esté modificando
        })
        setErrors(validate({ // seteame mi estado de errores pasándole la funcion validate
            ...input, // con el estado input con el e.target.name y el e.target.value
            [e.target.name] : e.target.value 
        }))
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){ // si el input está checked entonces
            setInput({ // toma el estado y setealo y traeme el input 
                ...input, 
                [e.target.name] : e.target.value //
            })
        }
    }

    function handleSelect(e){
        setInput({ // en el estado donde me va a guardar toto
            ...input, // Concateno lo que ya habia en el array, con el nuevo value
            countries: [...input.countries, e.target.value] // todo lo que ya había se concatena con target.value
        })
    }

    function handleSubmit(e){ //
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
            e.preventDefault();
            alert('Fillout all the spaces to continue')
        } else {
            e.preventDefault();
            dispatch(postActivity(input));
            alert('Success! The activity has been created');
            history('/home') // Para volver a la pantalla principal
            //history.push('/home') // Para volver a la pantalla principal
            setInput({ // Reseteamos el input tomando todo y pasándolo vacío
                name: '',
                difficulty: '',
                duration: '',
                season:'',
                countries: []
            })
        }
    }

    function handleDelete(e){
        setInput({ // seteo el input 
            ...input, // me traigo el anterior 
            //Se va a filtrar todo el array, devolviendo todos los paises que no coincidan con el seleccionado
            countries: input.countries.filter(country => country !== e) // me traigo el estado y me devuelve
        }) // filtralo por todo lo que no sea el elemento (e), me devuelver el estado de nuevo sin los elementos que hice click
    }        

    // useEffect(() => {
    //     dispatch(getCountries('ASC'))
    // }, [dispatch])
    // console.log(input)

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])
    console.log(input)

return (
<div className={styles.createactimg}>
    <Link to='/home'>
        <button>Back</button>
    </Link>
    <h1>Create Activity</h1>
    
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <label>Name of activity:</label>
            <input type="text" 
            value={input.name} 
            name='name'
            onChange={handleChange}
            />
            {errors.name && (<p>{errors.name}</p>)}
        </div>
    
        <div>
            <label>Difficulty: </label>
            <label>
                <input
                type="radio" 
                value='1' 
                name='difficulty'
                onChange={(e) => handleCheck(e)}/>1</label>
            <label>
                <input 
                type="radio"
                value='2'
                name='difficulty'
                onChange={(e) => handleCheck(e)}/>2</label>
            <label>
                <input type="radio"
                value='3'
                name='difficulty'
                onChange={(e) => handleCheck(e)}/>3</label>
            <label>
                <input 
                type="radio"
                value='4' 
                name='difficulty'
                onChange={(e) => handleCheck(e)}/>4</label>
            <label>
                <input
                type="radio" 
                value='5' 
                name='difficulty'
                onChange={(e) => handleCheck(e)}/>5</label>
        </div>
    
        <div>
            <label>Duration:</label>
                <input 
                type="text" 
                value={input.duration} 
                name='duration'
                onChange={handleChange}
                />
            {errors.duration && (<p>{errors.duration}</p>)}
        </div>    
       
        <div>
            <label>Season: </label>
            <label>
            <input 
                type="radio"
                value='Summer' 
                name='season'
                onChange={(e) => handleCheck(e)}/>Summer</label>
            <label>
            <input
                type="radio" 
                value='Spring' 
                name='season'
                onChange={(e) => handleCheck(e)}/>Spring</label>
            <label>
            <input 
                type="radio" 
                value='Fall' 
                name='season'
                onChange={(e) => handleCheck(e)}/>Fall</label>
            <label>
            <input 
                type="radio"
                value='Winter'
                name='season'
                onChange={(e) => handleCheck(e)}/>Winter</label>
            {errors.season && (<p>{errors.season}</p>)}
        </div>
       
        <div>
            <label>Country location of activity: </label>
                    <div>
                    <select onChange={(e) => handleSelect(e)}>
                    {countries.map((country) => ( // las meto en options
                        <option value={country.name}>{country.name}</option>
                    ))}
                    </select>
                    </div>
                    {errors.countries && (<p>{errors.countries}</p>)}
                    </div>
    </form>

                {input.countries.map((e) => // mi estado local que va a tener todos los países y se mapea en un div
                <div>
                    {/* renderiza un párrafo con el elemento y un botón que borre el elemento*/}
                    <p>{e}</p> 
                    <button type='button' onClick={() => handleDelete(e)}>X</button>
                </div>
                )}
                <div>
                <button type='submit'>Create Activity</button>
                </div>
    
</div>
)
}

//export default CreateActivity;
