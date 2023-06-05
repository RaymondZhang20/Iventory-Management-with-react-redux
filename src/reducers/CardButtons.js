import data from "../data/inventory.json";

const initialState = {
    isDeleting: false
};

const card = (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_ITEM":
            return {
                ...state,
                form: {
                    itemName: "",
                    itemDescription: "",
                    itemPrice: "",
                    itemImage: ""
                }
            };
        default:
            return state;
    }
};

export default card;