import { combineReducers } from 'redux';
import navbar from "./NavbarClick";
import form from "./FormButtons";
import card from "./CardButtons";

const rootReducer = combineReducers({
    navbar, form, card
});

export default rootReducer;