import { combineReducers } from 'redux';
import navbar from "./NavbarClick";
import form from "./FormReducer";
import inv from "./InventoryReducer";

const rootReducer = combineReducers({
    navbar: navbar,
    form: form,
    inv: inv
});


export default rootReducer;