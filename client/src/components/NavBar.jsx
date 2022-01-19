import { React, useState } from "react";
import { useDispatch } from "react-redux";
//import { useParams, useHistory } from 'react-router'
import { getByName } from "../actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // En estado local, me traigo el string vacío

  function handleInputChange(e) { // Guardo en estado local lo que se vaya generando en el input
    e.preventDefault();
    setName(e.target.value);
  }
  console.log(name);

  //const history = useHistory();
  // const handleInputChange = (event) => {
  //     event.preventDefault();
  //     setName(event.target.value)
  // }

  //const searchText = useState('')

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     history.push("/?search=" + searchText);
  // }

  const handleClick = (event) => {
    event.preventDefault(); // Name es mi estado local
    dispatch(getByName(name)); // Despacho la acción pasándole name, como estado local
    setName('')
  };

  return( // lógica del renderizado
    <form onSubmit={(event) => handleClick(event)}>
      <div>
      <input
        type = "text"
        placeholder = "Search country..."
        onChange = {(e) => handleInputChange(e)}
      />
      <button type="submit">Search</button>
      {/* <button type="submit" onClick={(e) => handleClick(e)}>Search</button> */}
      {/* <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button> */}
      </div>
    </form>
  );
}