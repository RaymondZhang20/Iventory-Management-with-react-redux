const initialState = {
    items: [],
    form: {
        itemName: "",
        itemDescription: "",
        itemPrice: "",
        itemImage: ""
    }
};

const form = (state = initialState, action) => {
    switch (action.type) {
        case "CLEAR_FORM":
            return {
                ...state,
                form: {
                    itemName: "",
                    itemDescription: "",
                    itemPrice: "",
                    itemImage: ""
                }
            };
        case "UPDATE_FORM":
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload,
                }
            };
        default:
            return state;
    }
};

export default form;