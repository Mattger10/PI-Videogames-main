import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../redux/actions";
import styled from "styled-components";

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    } 

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameVideogames(name))
    }

    return (
        <SearchBarContainer>
            <Input 
            type = 'text'
            placeholder="Buscar..."
            onChange={(e) => handleInputChange(e)}
            />
            <Button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</Button>
        </SearchBarContainer>
    )
}

const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 8px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
`;