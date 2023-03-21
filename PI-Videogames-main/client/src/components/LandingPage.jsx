import React from "react";
import { Link } from "react-router-dom";

export default function LandinPage(){
    return(
        <div>
            <h1>Bienvenidos a Mattger GAMES</h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}

