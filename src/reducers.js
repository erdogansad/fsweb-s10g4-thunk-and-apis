import { FAV_ADD, FAV_REMOVE, FETCH_SUCCESS, FETCH_LOADING, FETCH_ERROR, GET_FAVS_FROM_LS } from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      writeFavsToLocalStorage([...state.favs, action.payload]);
      return { ...state, favs: [...state.favs, action.payload] };
    case FAV_REMOVE:
      writeFavsToLocalStorage(state.favs.filter((fav) => fav !== action.payload));
      return { ...state, favs: state.favs.filter((fav) => fav !== action.payload) };

    case FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload };

    case FETCH_LOADING:
      return { ...state, loading: action.payload };

    case FETCH_ERROR:
      return { ...state, error: action.payload };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() };

    default:
      return state;
  }
}
