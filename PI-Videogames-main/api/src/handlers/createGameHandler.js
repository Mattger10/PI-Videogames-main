const { Videogame, Genres } = require('../db');
const { getAllGames } = require('../controllers/videoGameController');

const createGameHandler = async (req, res) => {
    try {
        const {name, description, released, rating, platforms, genres, image } = req.body;
        
        //Valido si me llega info obligatoria
        if(!name || !description || !platforms){
            res.status(400).send("Faltan enviar datos obligatorios")
        }
        //Valido si el nombre del juego ya existe en mi base de datos
        const videoGameFound = await Videogame.findAll({
            where: {
                name: name
            }
        })
        if(videoGameFound.length != 0){
            return res.send("Ya existe el videogame con ese nombre");
        }
        //Tambien validamos en caso sensitive
        const videoGameAll = await getAllGames();
        //console.log(videGameAll);
        const gameFound = videoGameAll.find(
            (el) => el.name.toLowerCase() === name.toLowerCase()
        )
        //console.log(gameFound)
        if(gameFound === undefined){
            const newVideoGame = await Videogame.create({
                name,
                description,
                released,
                rating,
                image,
                platforms
            })
            
            //El genero se lo pasamos aparte para armar las relaciones
            const genreDB = await Genres.findAll({
                where: {
                    name: genres//El cliente escribe el genero Accion
                }
            })
            newVideoGame.addGenres(genreDB)

            res.status(200).send("Se creo el videogame de forma correcta")
        }else{
            res.status(404).send("El nombre del videogame ya existe")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createGameHandler };