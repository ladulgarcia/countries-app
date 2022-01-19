import React from 'react';

// countries per Page
export default function Pagination ({countriesPerPage, allCountries, pagination}) {
    const pageNumbers = []; // con un ciclo for; Math.ceil redondea todos los países entre la cantidad de países que quiero por página
        for(let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++){ // division de todos los países entre paises por pagina
            pageNumbers.push(i+1);
            // pageNumbers.push(i);
        }
    // renderiza los números del paginado en mi componente
    // number = cada una de las páginas (allCountries / countriesPerPage) para renderizar los paises
    return(
        <nav>
            <ul>
            
                { pageNumbers &&
                    pageNumbers.map(number => (
                        <li>
                            <button onClick={() => pagination(number)}>{number}</button>
                        </li>

                    ))
                }
            </ul>
        </nav>
    )
}