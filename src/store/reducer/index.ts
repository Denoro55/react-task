import { findInArrayAndUpdate } from "../../helpers";

export enum Constants {
    SET_DATA = 'SET_DATA',
    TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
}

const rootReducer = (state: any = [], action: any) => {
    switch (action.type) {
        case Constants.SET_DATA:
            return action.payload;

        case Constants.TOGGLE_FAVORITE:
            return findInArrayAndUpdate(action.payload, state, (item: any) => {
                return {
                    favourite: !item.favourite
                }
            });

        default: return state
    }
};

export default rootReducer
