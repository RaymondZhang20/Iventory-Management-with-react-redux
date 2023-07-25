const localURI = 'http://localhost:4000';
const renderURI = 'https://inventory-management-ho3k.onrender.com';

const getInventory = async () => {
    const response = await fetch(`${renderURI}/albums`, {
        method: 'GET'
    });
    let data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    for (let item of data) {
        item["deleted"] = false;
        item["detailed"] = false;
    }
    return data;
};

const getArtists = async () => {
    const response = await fetch(`${renderURI}/artists`, {
        method: 'GET'
    });
    let data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

const sortInventory = async () => {
    const response = await fetch(`${renderURI}/albums/sorted`, {
        method: 'GET'
    });
    let data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    for (let item of data) {
        item["deleted"] = false;
        item["detailed"] = false;
    }
    return data;
};

const filterInventory = async (query) => {
    const response = await fetch(`${renderURI}/albums/filtered?${query}`, {
        method: 'GET'
    });
    let data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    for (let item of data) {
        item["deleted"] = false;
        item["detailed"] = false;
    }
    return data;
};

const addItem = async (item) => {
    const response = await fetch(`${renderURI}/albums`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
};

const deleteItem = async (itemId) => {
    const response = await fetch(`${renderURI}/albums/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

const updateItem = async (item) => {
    const response = await fetch(`${renderURI}/albums/${item._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

export default {
    getInventory, addItem, deleteItem, updateItem, sortInventory, filterInventory, getArtists
};