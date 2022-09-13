import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
    city: "Москва"
}

export const updCity = createAction("UPD_CITY");

export default createReducer(initialState, {
    [updCity]: function (state, action) {
        state.city = action.payload;
    }
})