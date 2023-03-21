import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(15)
  const indexOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div>
      <Link to="/videogames">Crear juego nuevo</Link>
      <h1>Mattger GAMES</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar todos los juegos
      </button>
      <div>
        <select>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
        </select>
        <select>
            <option value="Order-Rating">Order by rating</option>
            <option value="Men-May">Men-May</option>
            <option value="May-Men">May-Men</option>
        </select>
        <select>
            <option value="All">Géneros</option>
            {/* allGenres?.map(el => (<option key={el.id} value={el.name}>{el.name}</option>)) */}
        </select>
        <select >
            <option value="All">All</option>
            <option value="Created">Creados</option>
            <option value="Existing">Existentes</option>
        </select>
        <Paginado 
        videogamesPerPage={videogamesPerPage}
        allVideogames = {allVideogames.length}
        paginado = {paginado}
        />
        {currentVideogames?.map((e) => {
            return(
                <fragment>
                    <Link to={'/home/' + e.id}>
                <Card name={e.name} genres={e.genres} rating={e.rating} image={e.image}/>
                    </Link>
                </fragment>
            );
            })}
      </div>
    </div>
  );
}
