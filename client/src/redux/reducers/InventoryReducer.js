import {createSlice} from "@reduxjs/toolkit";
import {getInvAsync, addItemAsync, deleteItemAsync, updateItemAsync} from "../thunks";
import {REQUEST_STATE} from "../utils";

export const initialState = {
    items: [],
    getInv: REQUEST_STATE.IDLE,
    addItem: REQUEST_STATE.IDLE,
    deleteItem: REQUEST_STATE.IDLE,
    updateItem: REQUEST_STATE.IDLE,
    error: null
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        expandItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload) {
                    return {...item, detailed:true}
                }
                return item;
            });
        },
        compressItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload) {
                    return {...item, detailed:false}
                }
                return item;
            });
        },
        deleteItem: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload) {
                    return {...item, deleted:true}
                }
                return item;
            });
        },
        deleteAll: (state, action) => {
            state.items = state.items.map((item) => {
                return {...item, deleted:true}
            });
        },
        restoreAll: (state, action) => {
            state.items = state.items.map((item) => {
                return {...item, deleted:false}
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInvAsync.pending, (state) => {
                console.log("get inv pending");
                state.getInv = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getInvAsync.fulfilled, (state, action) => {
                console.log("get inv fulfilled");
                state.getInv = REQUEST_STATE.FULFILLED;
                state.items = action.payload;
            })
            .addCase(getInvAsync.rejected, (state, action) => {
                console.log("get inv rejected" + action.error);
                state.getInv = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(addItemAsync.pending, (state) => {
                console.log("add item pending");
                state.addItem = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                console.log("add item fulfilled");
                state.addItem = REQUEST_STATE.FULFILLED;
                state.items.push(action.payload);
            })
            .addCase(addItemAsync.rejected, (state, action) => {
                console.log("add inv rejected" + action.error);
                state.addItem = REQUEST_STATE.REJECTED;
                state.error = action.error;
                console.log(state.error);
            })
            .addCase(deleteItemAsync.pending, (state) => {
                console.log("delete item pending");
                state.deleteItem = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteItemAsync.fulfilled, (state, action) => {
                console.log("delete item fulfilled");
                state.deleteItem = REQUEST_STATE.FULFILLED;
                const itemId = action.payload.id;
                // const itemIndex = state.items.findIndex((item) => item.id === itemId);
                // state.items.splice(itemIndex, 1);
                state.items = state.items.filter(item => item.id !== itemId);
            })
            .addCase(deleteItemAsync.rejected, (state, action) => {
                console.log("delete item rejected" + action.error);
                state.deleteItem = REQUEST_STATE.REJECTED;
                state.error = action.error;
                console.log(state.error);
            })
            .addCase(updateItemAsync.pending, (state) => {
                console.log("update item pending");
                state.updateItem = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                console.log("update item fulfilled");
                state.updateItem = REQUEST_STATE.FULFILLED;
                const itemId = action.payload.id;
                state.items = state.items.map((item) => {
                    if (item.id === itemId) {
                        return {...item, ...action.payload};
                    } else {
                        return item;
                    }
                });
            })
            .addCase(updateItemAsync.rejected, (state, action) => {
                console.log("update item rejected" + action.error);
                state.updateItem = REQUEST_STATE.REJECTED;
                state.error = action.error;
                console.log(state.error);
            });
    },
});

export const {expandItem, compressItem, deleteItem, deleteAll, restoreAll} = inventorySlice.actions;
export default inventorySlice.reducer;