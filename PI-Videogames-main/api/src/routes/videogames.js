const { Router } = require ("express");
const axios = require("axios");
const { Videogame, Genres } = require ("../db");
const router = Router();
const { MY_API_KEY } = process.env;

// const getApiInfo = async () => {
//     let gamesArr = [];
//     let urlApi = `https://api.rawg.io/api/games?key=${MY_API_KEY}`; // CONTROLAR
//     try {
//         for (let i = 0; i < 5; i++) {
//             const urlData = await axios.get(urlApi);
//             urlData.data.results.map((element) => {
//                 gamesArr.push({
//                     id: element.id,
//                     name: element.name,
//                     description: element.description, // CORROBORAR
//                     image: element.image, // CORROBORAR
//                     released: element.released,
//                     rating: element.rating,
//                     platforms: element.platforms.map((element) => element.platform.name),
//                     genres: element.genres.map((element) => element.name),
//                 });
//             });
//             urlApi = urlData.data.next;
//         }
//         return gamesArr;
//     } catch(error){

//     }
// }


    const getApiInfo = async () => {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}`); //https://api.rawg.io/api/games/{id}
        // console.log(apiUrl)
        const apiInfo = await apiUrl.data.results.map(element => {
            return {
                     id: element.id,
                     name: element.name,
                     description: element.description, // CORROBORAR
                     image: element.background_image, // CORROBORAR
                     released: element.released,
                     rating: element.rating,
                     platforms: element.platforms.map((element) => element.platform.name),
                     genres: element.genres.map((element) => element.name),
            }
        });
        return apiInfo;
    }

//     const getDbInfo = async () => {
//          await Videogame.findAll({
//         include: {
//             model: Genres,
//             attributes: ["name"],
//             through: {
//                 attributes: [],
//             },
//         },
//     });
//     const newGamedB = await GamesdB.map((element) => {
//         return {
//             id: element.id,
//             name: element.name,
//             description: element.description_raw,
//             image: element.image,
//             released: element.released,
//             rating: element.rating,
//             platforms: element.platforms,
//             genres: element.genres.map((element) => element.name), //CORROBORAR
//             inDb: element.inDb,
//         };
//     });
//     return newGamedB;
// };


const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo ();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
};

//GET /VIDEOGAMES  y por NAME 
router.get('/', async (req, res) => {
    console.log("get")
    const { name } = req.query;
    const allVideogame = await getAllVideogames();
    if (name){
        const videogameName = await allVideogame.filter((element) =>
    element.name.toLowerCase().includes(name.toLowerCase()))
    videogameName.length ?
    res.status(200).send(videogameName) :
    res.status(404).send("No se encuentra el videojuego");
}else{
    res.status(200).send(allVideogame);
}});


router.get('/:id', async (req, res) => {
    const {id} = req.params
    if(!id.includes('-')) {
        const gameDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${MY_API_KEY}`)
        const data = await gameDetail.data
        let gameId = [{
            id: data.id,
            name: data.name,
            image: data.background_image,
            released: data.released,
            description: data.description_raw,
            rating: data.rating,
            genres: data.genres.results.map(element => element.name).join(','),
            platforms: data.platforms.map(element => element.platform.name).join(',')
        }]
        res.send(gameId)
    } else {
        let gameFounded = await Videogame.findByPk(id, {
            include: [{
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }]
        })
        var newArr = []
        newArr.push(gameFounded)
        
        res.send(newArr)
    }
})

router.get('/', async (req, res) => {
    const { name } = req.query;
  
    if (!name) {
      return res.status(400).json({ error: 'Missing parameter: name' });
    }
  
    const games = await Game.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      limit: 15
    });
  
    if (games.length === 0) {
      return res.status(404).json({ error: 'No games found' });
    }
  
    return res.json(games);
  });
  

// FUNCIONA, PERO NO TRAE DESCRIPTION
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     const allVideogame = await getAllVideogames();
//     if (id) {
//       let videogameId = await allVideogame.filter((videogame) => videogame.id == id);
//       videogameId.length
//         ? res.status(200).json(videogameId)
//         : res.status(404).send("Este juego no existe");
//     }
//   });




//POST DE /VIDEOGAMES
    

//     router.post("/", async (req, res) => {
//        const {name, image, description, released, rating, platforms } = req.body
//        try{
//         let newGame = await Videogame.create({
//             name, image, description, released, rating, platforms
//     })
//     let genInDb = await Genres.findAll({
//         where: {
//             name: genres
//         }
//     })
//     await newGame.addGenre(genInDb)
//     res.send('Nuevo juego creado con éxito')
// } catch (error) {
// }
// });

router.post('/', async (req, res, next) => {
    try {
        const { name, image, description, released, rating, platforms, genres } = req.body;
        const videogame = await Videogame.create({
            name, image, description, released, rating, platforms
        });

        let genresDb = await Genres.findAll({ where: { name: genres } })
        videogame.addGenre(genresDb)

        res.status(200).json({
            message: "videogame create"
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router;