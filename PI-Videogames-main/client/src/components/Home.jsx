import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByGenres, filterCreated, orderByName  } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import homeImage from "../assets/landing2.webp";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(15)
  const indexOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
  const currentVideogames = allVideogames?.slice(indexOfFirstVideogame, indexOfLastVideogame)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const [loading, setLoading] = useState(true);
  if(allVideogames.length > 0 && loading){
    setLoading(false)
  }

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterGenres(e){
    dispatch(filterVideogamesByGenres(e.target.value))
  }

  function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
  }

  function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  };

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
        <select onChange={e => handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
        </select>
        <select>
            <option value="Order-Rating">Ordenar por rating</option>
            <option value="Men-May">Menor-Mayor</option>
            <option value="May-Men">Mayor-Menor</option>
        </select>
        <select onChange={e => handleFilterGenres(e)}>
            <option value="All">Todos los géneros</option>
            <option value="Action">Acción</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Estrategia</option>
            <option value="Shooter">Disparos</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulación</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Plataformas</option>
            <option value="Racing">Carreras</option>
            <option value="Massively Multiplayer">Multijugador</option>
            <option value="Sports">Deportes</option>
            <option value="Fighting">Peleas</option>
            <option value="Family">Familiar</option>
        </select>
        <select onChange={e => handleFilterCreated(e)}>
            <option value="All">Todos</option>
            <option value="Created">Creados</option>
            <option value="Existing">Existentes</option>
        </select>
        {allVideogames && (
        <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado = {paginado}
        />
        )}
        <SearchBar/>
        {currentVideogames?.map((e) => {
            return(
              <div key={e.id}>
                    <Link to={'/home/' + e.id}>
                <Card name={e.name} genres={e.genres} rating={e.rating} image={e.image}/>
                    </Link>
              </div>      
            );
            })}
      </div> : <Loading/>
    </div>
  );
}
