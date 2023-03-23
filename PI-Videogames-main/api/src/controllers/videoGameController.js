const { Videogame, Genres } = require('../db');
const axios = require('axios');
const { MY_API_KEY } = process.env;
require("dotenv").config();

//Obtengo la info de la API
const getApiInfo = async () => {
    try {
        //Me creo un arreglo vacio donde voy a guardar mis 100 Videogames
        const firstHundredGames = [];
        for(let i = 1; i <= 5; i++){
            let dataApi = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page=${i}`)
            //mapeamos la data y agregamos la info que vamos a trabajar a nuestro array de objetos:
            dataApi.data.results.map(el => {
                firstHundredGames.push({
                    id: el.id,
                    name: el.name,
                    description: el.description,
                    platforms: el.platforms? el.platforms.map((el) => el.platform.name).join(', ') : ["No hay datos de plataformas"],
                    image: el.background_image,
                    released: el.released,
                    rating: el.rating,
                    genres: el.genres? el.genres.map(el => el.name).join(' '): ["No hay datos de géneros"],
                })
            })
        }
        return firstHundredGames;   
    } catch (error) {
        console.log(error);
    }
}
//getApiInfo();

//Obtengo mi info de mi Base de datos

const getInfoDb = async () => {
    try { 
        const dataInfo = await Videogame.findAll({
            include: [
                {
                    model: Genres,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }

            ] 
        })
    
        //mapeo la info de la BD y devuelvo un array de obj
        const arrayInfoData = dataInfo.length? 
        dataInfo.map(el => {
            //Devolvemos un objeto
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                platforms: el.platforms.length? el.platforms.map(e => e): [""],
                image: el.image,
                released: el.released,
                rating: el.rating,
                genres: el.genres? el.genres.map(e => e.name).join(' '): [""],
                createdInDb: el.createdInDb
            }
        }) :
        [];
        return arrayInfoData;
    } catch (error) {
        console.log(error);
    }
}

//Obtengo toda la info junta en un array de objetos

const getAllGames = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getInfoDb();
        //console.log(dbInfo);
        const infoTotal = apiInfo.concat(dbInfo);
        //const infoTotal2 = [...apiInfo,...dbInfo]
        //console.log(infoTotal);
        return infoTotal;
    } catch (error) {
        console.log(error);
    }
}
//getAllGames();

module.exports = {getApiInfo, getInfoDb, getAllGames};

