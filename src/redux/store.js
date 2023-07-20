import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { todoReducer } from "./todoReducer";

//define store for todoReducer
export const store = configureStore({
    reducer:{
        todoReducer
    },
    
});