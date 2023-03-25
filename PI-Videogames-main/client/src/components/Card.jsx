import React from "react";
import styled from "styled-components";


export default function Card ({id, name, genres, rating, image}) {
    return (
		
        <CardContainer>
            <div>
                <CardImage src={image} alt={name}/>
                <CardDetails>
                    <CardTitle>{name}</CardTitle>
                    <CardGenre>Géneros: {genres}</CardGenre>
                    <CardRating>Rating: {rating}</CardRating>
                </CardDetails>
            </div>
        </CardContainer>
    )
}

const CardContainer = styled.div`
	justify-content: space-between;
	text-align: center;
	width: 100px;
	height: 350px;
	align-items: center;
	background: #5440FF;
	background: linear-gradient(
		45deg,
		#131d40 25%,
		#7ADDFF 100%
	);

	display: flex;
	flex-direction: row;
	vertical-align: bottom;
	width: 350px;
	color: black;
	font-family: 'Oswald', sans-serif;
	border-radius: 10px;
	margin-top: 50px;
	margin-bottom: 5px;
	margin-left: 5px;
	margin-right: 5px;
	float: left;
	box-shadow: 0 10px 10px rgba(7, 17, 19, 0.185);
  justify-content: center;
}
`;

const CardImage = styled.img`
  max-width: 100%;
  width: 300px;
	height: 200px;
  border-radius: 10px;
`;

const CardDetails = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
margin-top: 10px;
font-family: 'Oswald', sans-serif;
font-family: 'Rajdhani', sans-serif;
text-shadow: rgba(148, 187, 233, 1);
font-size: 18px;
box-shadow: 0 10px 50px rgba(7, 17, 19, 0.027);
`;

const CardGenre = styled.h5`
  margin-bottom: 5px;
`;

const CardRating = styled.h5`
  margin-bottom: 0;
`;