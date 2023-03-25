import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenres,
  filterCreated,
  orderByName,
  orderByRating,
  getGenres,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import styled from "styled-components";
import landingImage from "../assets/fondonegro.webp";
import { useHistory } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allGenres = useSelector((state) => state.genres);
  const allVideogames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames?.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [loading, setLoading] = useState(true);
  if (allVideogames.length > 0 && loading) {
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  const redirect = () => {
    history.push("/videogames");
  };

  function handleFilterGenres(e) {
    dispatch(filterVideogamesByGenres(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleRatingSort(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <Container>
      <Image src={landingImage} alt="" />
      <Container2>
        {allVideogames.length > 0 ? (
          <div>
            <>
              <H1>Mattger GAMES</H1>
            </>
            <ButtonsContainer>
              <Button onClick={redirect}>Crear videojuego</Button>
              <Button
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Recargar todos los videojuegos
              </Button>
            </ButtonsContainer>
            <div>
              <select onChange={(e) => handleSort(e)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
              <select onChange={(e) => handleRatingSort(e)}>
                <option value="Order-Rating">Ordenar por rating</option>
                <option value="Men-May">Menor rating</option>
                <option value="May-Men">Mayor rating</option>
              </select>
              <select onChange={(e) => handleFilterGenres(e)}>
                <option value="All">Todos los géneros</option>
                {/* {allGenres?.map((e) => {
                  return <option value={e.name}>{e.name}</option>;
                })} */}

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
              <select onChange={(e) => handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="Created">Creados</option>
                <option value="Existing">Existentes</option>
              </select>
            </div>
            {allVideogames && (
              <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
              />
            )}
            <SearchBar />
            <VideogamesContainer>
              {currentVideogames?.map((videogame) => {
                return (
                  <Link to={`/details/${videogame.id}`}>
                    <Card
                      image={videogame.image}
                      name={videogame.name}
                      rating={videogame.rating}
                      genres={videogame.genres}
                    />
                  </Link>
                );
              })}
            </VideogamesContainer>
          </div>
        ) : (
          <Loading />
        )}
      </Container2>
    </Container>
  );
}

const VideogamesContainer = styled.div`
  z-index: 1;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-conten: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Container2 = styled.div`
  z-index: 1;
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-conten: center;
  align-items: center;
`;
const Image = styled.img`
  height: 100vh;
  z-index: 0;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.div `
display: flex;
  justify-content: center;
  align-conten: center;
  align-items: center;
`
const Button = styled.button`
  width: 165px;
  height: 62px;
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  border-radius: 1rem;
  border: none;
  position: relative;
  background: #ab58ff;
  transition: 1s;
  margin: 10px;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle farthest-corner at 10% 20%,
      #5440ff 17.8%,
      #ff25d4 100.2%
    );
    filter: blur(15px);
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
  }

  &:active {
    transform: scale(0.9) rotate(3deg);
    background: radial-gradient(
      circle farthest-corner at 10% 20%,
      #5440ff 17.8%,
      #ff25d4 100.2%
    );
    transition: 0.5s;
  }
`;

const H1 = styled.h1`
  justify-content: space-between;
  text-align: center;
  width: 100%;
  height: 50px;
  background: #ff7ae5;
  background: linear-gradient(45deg, #ff7ae5 25%, #01487e 100%);
`;
