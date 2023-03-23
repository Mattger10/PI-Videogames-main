const { Videogame, Genres } = require('../db');
const axios = require('axios');
const { MY_API_KEY } = process.env;

//Primero me traigo la info x id de la API:
const gameByIdApi = async (id) => {
    try {
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${MY_API_KEY}`);
        //console.log(gameApi);
        
        const gameData = await gameApi.data
        const gameInfo = {
            id: gameData.id,
            name: gameData.name,
            released: gameData.released,
            rating: gameData.rating,
            genres: gameData.genres.map((el) => el.name),
            platforms: gameData.parent_platforms.map((el) => el.platform.name),
            image: gameData.background_image,
            description: gameData.description_raw,
        }
        return gameInfo;
    } catch (error) {
        console.log(error);
    }
}
//gameByIdApi();

//Segundo obtengo la info x id de mi DataBase:

const gameByIdDB = async (id) => {
    const gameDb = await Videogame.findOne({
        where: {
            id: id,
        },
        include: {
            model: Genres,
            through: {
                attributes: [],
            }
        }
    })
    //Creamos un objeto que tendra los atributos de nuesta tabla videogame
    const gameInfoDb = {
        id: gameDb.id,
        name: gameDb.name,
        released: gameDb.released,
        rating: gameDb.rating,
        genres: gameDb.genres.map((el => el.name)),
        platforms: gameDb.platforms,
        image: gameDb.image,
        description: gameDb.description,
        createdInDb: gameDb.createdInDb
    }
    return (gameInfoDb)
}

//Tercero condiciono mi búsqueda indagando si el id recibido por params
//Fue creado en mi DATABASE o no. Si es asi voy a buscarlo a base de datos, sino lo busco en la API.
const videoGameById = async (id) => {
    const dataId = id.includes("-")
    //Las id creadas en DB contienen separadores, NO OLVIDARSE!!!
    if(dataId) {
        const videoGameDb = await gameByIdDB(id);
        return videoGameDb;
    }else{
        const videoGameApi = await gameByIdApi(id);
        return videoGameApi;
    }
}

module.exports = { videoGameById };