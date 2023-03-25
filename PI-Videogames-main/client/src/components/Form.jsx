import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getGenres, postVideogames, getPlatforms } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import validation from "../redux/validations";
import styled from "styled-components";

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
  
  return (
    <Container>
      <Link to="/home">
        <Button>Volver a inicio</Button>
      </Link>
      <Title>¡Creá tu videojuego!</Title>
      <form onSubmit={handleSubmit}>
        <Div>
          <Input placeholder="Ingresar nombre" type="text" value={input.name} name="name" onChange={handleChange} />
          {errors.name?.map && <Error>{errors.name}</Error>}
        </Div>
        <Div>
          {/* <label>Descripción: </label> */}
          <Input placeholder="Ingresar descripción" type="text" value={input.description} name="description" onChange={handleChange} /> 
          {errors.description?.map && <Error>{errors.description}</Error>}
        </Div>
        <Div>
          {/* <label>Fecha de lanzamiento: </label> */}
          <Input type="date" value={input.released} name="released" onChange={handleChange} />
          {errors.released?.map && <Error>{errors.released}</Error>}
        </Div>
        <Div>
          {/* <label>Rating: </label> */}
          <Input placeholder="Ingresar rating" type="number" value={input.rating} name="rating" onChange={handleChange} />
          {errors.rating?.map && <Error>{errors.rating}</Error>}
        </Div>
        <Div>
          {/* <label>Imagen: </label> */}
          <Input placeholder="Ingresar URL de imagen"type="text"  value={input.image} name="image" onChange={handleChange} />
          {errors.image?.map && <Error>{errors.image}</Error>}
          <input type="file" />
        </Div>
        <SelectWrapper>
                    {/* <label>Géneros: </label> */}
                    <Select onChange={(e) => handleSelectGenres(e)}>
                        <Option value="All">Seleccionar género</Option>
                        {genres && 
                        genres.map((genre) =>{
                            return(
                            <Option  key={genre.id} value={genre.name}>{genre.name}</Option>
                        )})
                        }
                    </Select>
                </SelectWrapper>
                <div >
                    {input.genres.map((el) => (
                       
                            <div >
                               {el + " "} 
                               <Button  type="button" onClick={() => handleDeleteGenres(el)}>x</Button>
                            </div>
                        
                    ))}
                </div>
        <SelectWrapper>
        {/* <label>Plataformas: </label> */}
        <Select onChange={(e) => handleSelect(e)}>
        <Option value="All">Seleccionar plataformas</Option>
            {platformsList && platformsList.map((platform) => {
              return (
                <Option key={platform} value={platform}>{platform}</Option>
              )
              })}
        </Select>
        {errors.platforms?.map && <Error>{errors.platforms}</Error>}
        </SelectWrapper>
        <div>
            {input.platforms.map((e) => (
              
                <div>
                  {e + " "}
                  <Button type="button" onClick={() => handleDeletePlatforms(e)}>X</Button>
                </div>
              
            ))}
        </div>
                <div>
                {errors.name ? null : <Button type="submit" onSubmit={(e) => handleSubmit(e)}>Crear videojuego</Button>}     
                </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 0.5rem;
`;

const Option = styled.option`
  padding: 0.5rem;
`;

const Button = styled.button`
  background-color: #008CBA;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
`;