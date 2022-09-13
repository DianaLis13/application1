import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cityReducer from "../reducers/cityReducer";
import urlReducer from "../reducers/urlReducer";

const rootReducer = combineReducers({
    cityReducer: cityReducer,
    urlReducer: urlReducer
})

export const store = configureStore({
    reducer: rootReducer,
})