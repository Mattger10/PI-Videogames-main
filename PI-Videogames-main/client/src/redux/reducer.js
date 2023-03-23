const initialState = {
  videogames: [],
  allVideogames: [],
  platforms: [],
  detail: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "GET_PLATFORMS":
        return{
            ...state,
            platforms: action.payload
        }  

        case "GET_GENRES":
            return{
                ...state,
                genres: action.payload
            }

    case "FILTER_BY_GENRES":
      const allVideogames = state.allVideogames;
      const genresFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((e) => e.genres.includes(action.payload));
      return {
        ...state,
        videogames: genresFiltered,
      };

    case "POST_VIDEOGAMES":
      return {
        ...state,
      };

    case "FILTER_CREATED":
      const allVideogames2 = state.allVideogames;
      const createdFilter =
        action.payload === "Created"
          ? allVideogames2.filter((e) => e.createdInDb)
          : allVideogames2.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames: action.payload === "All" ? allVideogames2 : createdFilter,
      };

    //Ordena en ascendete y descendente
    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };
      
      case "GET_DETAILS":
        return {
          ...state,
          detail: action.payload

        }
    default:
      return state;
  }
}

export default rootReducer;
