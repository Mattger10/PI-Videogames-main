const { getAllGames } = require('../controllers/videoGameController');
const axios = require('axios');
const { MY_API_KEY } = process.env;


//Funciones manejadoras para VIDEOGAMES

const getGamesHandler = async (req, res) => {
    //console.log('RUTA A http://localhost:3001/videogames?&key=... Y A http://localhost:3001/videogames?name="..."&key=...');
    try {
        //Si el cliente introduce un name por query
        const { name } = req.query;
        //Valido si existe name:
        if(name){
            //voy a buscarlo a la API
            const dataApi = await axios(`https://api.rawg.io/api/games?search=${name}&key=${MY_API_KEY}`);
            //me trae la info .data
            //console.log(dataApi)
            //valido si dataApi existe:
            if(!dataApi.data.count){
                res.status(404).send("Videogame no encontrado");
            } 
            //Valido que el array results sea mayor a 15, si lo es, solo traeme 15 elementos del array
            if(dataApi.data.results.length > 15){
                dataApi.data.results.length = 15
            }
            //hasta aqui ya tengo mis 15 videogames, ahora mapeamos esa data y retornamos un array con esos 15 obj
            const gameApi = dataApi.data.results.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    description: el.description,
                    released: el.released,
                    rating: el.rating,
                    image: el.background_image,
                    genres: el.genres.map(genre => genre.name).join(' '),
                    platform: el.platforms.map((el) => el.platform.name).join(' ')
                }
            })
            //Respondemos con el array de objetos que creamos
            res.status(200).json(gameApi);
        }else{
            //Si no se recibe un name por query, le devolvemos todos los videogames
            const allGames = await getAllGames();
            res.status(200).json(allGames);
        }
        //-------------------Revisar por que no funciono esta primera ruta-----------------------//
        // const { name } = req.query;
        // const infoApi = await getApiInfo();
        // console.log(name);
        // if(name){
        //     //const nameGames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_API_KEY}`);
        //     //console.log(nameGames);
        //     //return nameGames;
        //     const gamesFound = infoApi.filter(
        //         el => el.name.toLowerCase().includes(name.toLowerCase())
        //     );
        //     if(gamesFound){
        //         res.status(200).json(gamesFound.slice(0, 15))    
        //     }else{
        //         res.status(400).send(`No se encontro el videojuego ${name} solicitado`)
        //     }
        // }else{
        //     res.status(200).json(infoApi)
        // }
        //-----------------------------------------------------------------------------------------//
    } catch (error) {
        console.log(error);
    }
}

//getGamesHandler();





module.exports = { getGamesHandler };