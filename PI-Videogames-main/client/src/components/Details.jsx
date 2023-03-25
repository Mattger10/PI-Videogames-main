import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails} from "../redux/actions";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import styled from "styled-components";


export default function Details() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { id } = useParams();
  
    useEffect(() => {
      dispatch(getDetails(id));
    }, [dispatch, id]);
  
    const myVideogame = useSelector((state) => state.detail);
    const detailPlatform = myVideogame.platforms?.join("-");
    const detailGenres = myVideogame.genres?.join("-");
  
    if (Object.keys(myVideogame).length > 0 && loading) {
      setLoading(false);
    }
  
    return (
      <DetailContainer>
        {Object.keys(myVideogame).length > 0 && !loading ? (
          <div>
            <DetailHeader>
              <Link to="/home">
                <Button>Volver</Button>
              </Link>
              <GameTitle>{myVideogame.name}</GameTitle>
              <GameImage src={myVideogame.image} alt="img not found"  />
              <GameInfo>
                <InfoLabel>Plataformas: </InfoLabel>
                <InfoText>
                  {detailPlatform ? detailPlatform : "No tiene plataformas"}
                </InfoText>
                <InfoLabel>Generos: </InfoLabel>
                <InfoText>{detailGenres}</InfoText>
                <InfoLabel>Lanzamiento</InfoLabel>
                <InfoText>{myVideogame.released}</InfoText>
                <InfoLabel>Rating: </InfoLabel>
                <InfoText>{myVideogame.rating}</InfoText>
              </GameInfo>
            </DetailHeader>
            <GameDescription>
              <p>{myVideogame.description}</p>
            </GameDescription>
          </div>
        ) : (
          <Loading />
        )}
      </DetailContainer>
    );
  }

  const Button = styled.button`
  background-color: #a6e1fa;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DetailContainer = styled.div`
border-radius: 4rem;
    padding: 2rem;
    margin-top: 3rem;
    display: flex;
    border: solid 1px #fff;
    box-shadow: 1px 1px 1px 1px #fff9f9ea;
    color: #fff;
    position: relative;
    top: 0%;
    right: 0%;
    transition: all 400s;
    background-image: linear-gradient(0deg, #81afef60, transparent);
}

&:hover{
    box-shadow: 5px 5px 20px #faf9f9e3;
}
`;

const DetailHeader = styled.div`

`;

const GameTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const GameImage = styled.img`
width: 20rem;
height: 12rem;
border-radius: 9999rem;
overflow: hidden;
transition: .8s;

&:hover {
  transform: scale(1.05);
  color:#fff;
  background-color: #fff;
  box-shadow: 1px 1px 1px 1px #fff9f9ea, 0 0 10px #fff9f9ea;
}
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const InfoText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const GameDescription = styled.div`
  margin-top: 20px;
  text-align: justify;
  width: 50%;
`;