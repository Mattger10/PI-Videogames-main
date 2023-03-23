const { Genres } = require('../db');
const axios = require('axios');
const { MY_API_KEY } = process.env;


const getGenresApi = async () => {

    const genresDataApi = await axios.get(`https://api.rawg.io/api/genres?&key=${MY_API_KEY}`)
    //console.log(genresDataApi);

    const genresApi = genresDataApi.data.results.map((genre) => genre.name)

    genresApi.map(async (el) => {
        //Uso findOrCreate que buscara el genero en mi db y si esta vacia los crea y guarda
        await Genres.findOrCreate({
            where: { name: el }
        })
    })
    //Me traigo todos los generos 
    const allGenres = await Genres.findAll();
    return allGenres;
}

module.exports = { getGenresApi };