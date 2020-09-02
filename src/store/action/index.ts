import {Constants} from "../reducer";

export const toggleFavorite = (id: number) => ({
    type: Constants.TOGGLE_FAVORITE,
    payload: id
});

export const setData = (list: any[]) => ({
    type: Constants.SET_DATA,
    payload: list
});
