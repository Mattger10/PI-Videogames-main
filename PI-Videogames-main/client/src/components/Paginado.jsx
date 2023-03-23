import React from "react";

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className="paginado">
                { pageNumbers &&
                pageNumbers.map(number => {
                    return (
                    <li className="number" key={number}>
                    <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                )})}
            </ul>
        </nav>
    )
}