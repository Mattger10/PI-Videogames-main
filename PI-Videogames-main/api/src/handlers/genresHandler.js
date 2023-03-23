const { getGenresApi } = require('../controllers/genresController');

const getGenresHandler = async (req, res) => {
    //console.log("RUTA PARA OBTENER LOS GENEROS https://api.rawg.io/api/genres?&key=....");
    try {
        const genres = await getGenresApi();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).send(error.message);
    }

}

module.exports = { getGenresHandler };