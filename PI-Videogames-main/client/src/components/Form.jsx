import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogames, getPlatforms } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validation from "../redux/validations";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const platformsList = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validation({
            ...errors,
            [e.target.name]: e.target.value
        }))
    } 


  function handleSelect(e){
    if (!input.platforms.includes(e.target.value)){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validation({
          ...input,
          platforms: [...input.platforms, e.target.value]
      }))
  }else{
      setInput({
          ...input
      })
  }
}

function handleDeletePlatforms(e){
  setInput({
      ...input,
      platforms: input.platforms.filter(el => el !== e)
  })
}

function handleSelectGenres(e){
  //Verifico que no puedam seleccionarse repetidos
  if(!input.genres.includes(e.target.value)){
      //Si el genero seleccionado no esta en el array, entonces incluilo
      setInput({
          ...input,
          genres: [...input.genres, e.target.value] //==>>Traigo lo que ya tengo y lo concateno
      });
      setErrors(validation({
          ...input,
          genres: [...input.genres, e.target.value]
      }));
  }else{
      setInput({
          ...input
      });
  }
}

function handleDeleteGenres(e){
  setInput({
      ...input,
      genres: input.genres.filter(el => el !== e)
  });
}

  function handleSubmit(e){
    e.preventDefault();
    dispatch(postVideogames(input))
    alert("Tu videojuego ha sido creado")
    setInput({
      name: "",
    description: "",
    released: "",
    rating: "",
    image: "",
    platforms: [],
    genres: []
    })
    history.push('/home')
  }

//   function handleCheck(e){
//     if(e.target.checked){
//         setInput({
//             ...input,
//             status: e.target.value 
//         })
//     }
//   }

  

  return (
    <div>
      <Link to="/home">
        <button>Volver a inicio</button>
      </Link>
      <h1>¡Creá tu videojuego!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input placeholder="Ingresar nombre" type="text" value={input.name} name="name" onChange={handleChange} />
          <span>{errors.name && <p>{errors.name}</p>} </span>
        </div>
        <div>
          <label>Descripción: </label>
          <input placeholder="Ingresar descripción" type="text" value={input.description} name="description" onChange={handleChange} /> 
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label>Fecha de lanzamiento: </label>
          <input type="date" value={input.released} name="released" onChange={handleChange} />
          {errors.released && <p>{errors.released}</p>}
        </div>
        <div>
          <label>Rating: </label>
          <input placeholder="Ingresar rating" type="number" value={input.rating} name="rating" onChange={handleChange} />
          {errors.rating && <p>{errors.rating}</p>}
        </div>
        <div>
          <label>Imagen: </label>
          <input placeholder="Ingresar imagen" type="text" value={input.image} name="image" onChange={handleChange} />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
        <h6>Plataformas: </h6>
        <select onChange={(e) => handleSelect(e)}>
        <option value="All">Seleccionar plataformas</option>
            {platformsList && platformsList.map((platform) => {
              return (
                <option key={platform} value={platform}>{platform}</option>
              )
              })}
        </select>
        {errors.platforms && <p>{errors.platforms}</p>}
        </div>
        <div>
            {input.platforms.map((e) => (
              <li>
                <div>
                  {e + " "}
                  <button type="button" onClick={() => handleDeletePlatforms(e)}>X</button>
                </div>
              </li>
            ))}
        </div>
        <div>
                    <h6>Géneros: </h6>
                    <select onChange={(e) => handleSelectGenres(e)}>
                        <option value="All">Seleccionar género</option>
                        {genres && 
                        genres.map((genre) =>{
                            return(
                            <option  key={genre.id} value={genre.name}>{genre.name}</option>
                        )})
                        }
                    </select>
                </div>
                <div >
                    {input.genres.map((el) => (
                        <li key={el} >
                            <div >
                               {el + " "} 
                               <button  type="button" onClick={() => handleDeleteGenres(el)}>x</button>
                            </div>
                        </li>
                    ))}
                </div>
                <div>
                {errors.name ? null : <button type="submit" onSubmit={(e) => handleSubmit(e)}>Crear videojuego</button>}     
                </div>
      </form>
    </div>
  );
}
