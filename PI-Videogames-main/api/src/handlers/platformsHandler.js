const { getApiInfo } = require('../controllers/videoGameController');

const getPlatformsHandler = async (req, res) => {
    try {
        const allInfo = await getApiInfo();
        //console.log(allInfo)//==>>[{},{},{}]
        
        //Mapeo todos los obj y me quedo con sus propiedad plataformas que es un array 
        const containerPlatforms = allInfo.map(el => el.platforms);
        //console.log(containerPlatforms);// ==>> un array con string['.. ..', '... .. ..', '...'];
        
        const containerPlatformsJoin = containerPlatforms.join();
        //console.log(containerPlatformsJoin);//==>>Aqui tengo un string con todos las plataformas "...., ...., ..., ...";

        const containerPlatformsArray = containerPlatformsJoin.split(',')
        //console.log(containerPlatformsArray);//==>> aplico un split(',') para otorgarle su propio indice a mi array de plataformas
        
        //Elimino los espacios vacios
        const containerPlatformsArrayPerfecto = containerPlatformsArray.map(el => el.trim());
        //console.log(containerPlatformsArrayPerfecto);
        //Elimino los repetidos para obtener todas las plataformas existente 
        const uniquePlatforms = [];
        containerPlatformsArrayPerfecto.forEach(el => {
            if(!uniquePlatforms.includes(el)){
                uniquePlatforms.push(el)
            }
        })
        //console.log(uniquePlatforms);
        //Aplico un ternario para verificar que exista
        uniquePlatforms.length ?
        res.status(200).json(uniquePlatforms) :
        res.status(400).send("Fallo la eliminación de los repetidos")

        // const allPlatforms = containerPlatforms.map(el => el.map(platform => {
        //     if(!allPlatforms.includes(platform)){
        //         allPlatforms.push(platform)
        //     }
        // }))
    } catch (error) {
        console.log(error)
    }
}
//getPlatforms()

module.exports = {getPlatformsHandler};