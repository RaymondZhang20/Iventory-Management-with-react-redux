const getInventory = async () => {
    const response = await fetch('http://localhost:4000/users', {
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
    const response = await fetch('http://localhost:4000/users/newItem', {
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
    const response = await fetch(`http://localhost:4000/users/${itemId}`, {
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
    const response = await fetch(`http://localhost:4000/users/${item.id}`, {
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
    getInventory, addItem, deleteItem, updateItem
};