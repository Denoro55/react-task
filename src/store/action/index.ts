import {Constants} from "../reducer";

type ToggleFavoriteType = {
    type: Constants.TOGGLE_FAVORITE,
    payload: number
}

export const toggleFavorite = (id: number): ToggleFavoriteType => ({
    type: Constants.TOGGLE_FAVORITE,
    payload: id,
});

type SetDataType = {
    type: Constants.SET_DATA,
    payload: any[]
}

export const setData = (list = []): SetDataType => ({
    type: Constants.SET_DATA,
    payload: list
});
