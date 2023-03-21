import React from "react";

export default function Card ({id, name, genres, rating, image}) {
    return (
        <div>
            <div>
                <img src={image} alt={name}/>
                <div>
                    <h3>{name}</h3>
                    <h5>Géneros: {genres}</h5>
                    <h5>Rating {rating}</h5>
                </div>
            </div>
        </div>
    )
}
