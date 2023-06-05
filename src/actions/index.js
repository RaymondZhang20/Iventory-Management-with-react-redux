export const navToHome = () => {
    return {
        type: 'NAV_HOME',
    };
};

export const navToAbout = () => {
    return {
        type: 'NAV_ABOUT',
    };
};

export const addItem = (item) => {
    return {
        type: "ADD_ITEM",
        payload: item
    };
};

export const clearForm = () => {
    return {
        type: "CLEAR_FORM"
    };
};

export const deleteAllItems = () => {
    return {
        type: "DELETE_ALL_ITEMS"
    };
};

export const restoreAllItems = () => {
    return {
        type: "RESTORE_ALL_ITEMS"
    };
};

export const deleteItem = (itemName) => {
    return {
        type: "DELETE_ITEM",
        payload: itemName
    };
}

export const expandItem = (itemName) => {
    return {
        type: "EXPAND_ITEM",
        payload: itemName
    };
}

export const compressItem = (itemName) => {
    return {
        type: "COMPRESS_ITEM",
        payload: itemName
    };
}