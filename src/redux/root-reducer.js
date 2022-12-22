import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'; //tell redux-persist that I want to use the localStorage as default storage.

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']  // only cart reducer will be persisted
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);