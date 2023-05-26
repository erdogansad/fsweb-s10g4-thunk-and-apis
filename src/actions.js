import axios from "axios";
import { toast } from "react-toastify";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => (dispatch) => {
  const returnPromise = () => new Promise((resolve) => setTimeout(() => resolve(), 1000));
  toast.promise(returnPromise, {
    pending: "Favorilere ekleniyor...",
    success: {
      render() {
        dispatch({ type: FAV_ADD, payload: info });
        dispatch(fetchAnother());
        return "Favorilere eklendi 👌";
      },
    },
    error: "Favorilere eklenirken bir hata oluştu 🤯",
  });
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};

export const fetchAnother = () => (dispatch) => {
  dispatch({ type: FETCH_SUCCESS, payload: null });
  dispatch({ type: FETCH_LOADING, payload: true });
  axios
    .get("https://www.boredapi.com/api/activity")
    .then((resp) => dispatch({ type: FETCH_SUCCESS, payload: resp.data }))
    .catch((err) => dispatch({ type: FETCH_ERROR, payload: err }));
};
