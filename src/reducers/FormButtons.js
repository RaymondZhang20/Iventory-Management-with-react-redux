import data from "../data/inventory.json";
for (let item of data) {
    item["deleted"] = false;
    item["detailed"] = false;
}

const initialState = {
    items: data,
    form: {
        itemName: "",
        itemDescription: "",
        itemPrice: "",
        itemImage: ""
    }
};

const form = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case "DELETE_ITEM":
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.itemName === action.payload) {
                        return {...item, deleted:true}
                    }
                    return item;
                })
            };
        case "EXPAND_ITEM":
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.itemName === action.payload) {
                        return {...item, detailed:true}
                    }
                    return item;
                })
            };
        case "COMPRESS_ITEM":
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.itemName === action.payload) {
                        return {...item, detailed:false}
                    }
                    return item;
                })
            };
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
        case "DELETE_ALL_ITEMS":
            return {
                ...state,
                items: state.items.map((item) => {
                    return {...item, deleted:true}
                })
            };
        case "RESTORE_ALL_ITEMS":
            return {
                ...state,
                items: state.items.map((item) => {
                    return {...item, deleted:false}
                })
            };
        default:
            return state;
    }
};

export default form;