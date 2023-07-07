import { createAsyncThunk } from '@reduxjs/toolkit';
import DataService from './service';

export const getInvAsync = createAsyncThunk(
    "users/getInv",
    async () => {
        return await DataService.getInventory();
    }
);

export const getArtistsAsync = createAsyncThunk(
    "users/getArtists",
    async () => {
        return await DataService.getArtists();
    }
);

export const sortInvAsync = createAsyncThunk(
    "users/sortInv",
    async () => {
        return await DataService.sortInventory();
    }
);

export const filterInvAsync = createAsyncThunk(
    "users/filterInv",
    async (query) => {
        return await DataService.filterInventory(query);
    }
);

export const addItemAsync = createAsyncThunk(
    "users/addItem",
    async (item) => {
        return await DataService.addItem(item);
    }
);

export const deleteItemAsync = createAsyncThunk(
    "users/deleteItem",
    async (itemId) => {
        return await DataService.deleteItem(itemId);
    }
);

export const updateItemAsync = createAsyncThunk(
    "users/updateItem",
    async (item) => {
        return await DataService.updateItem(item);
    }
);

