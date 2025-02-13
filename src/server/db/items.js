//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/server/repository.js


const items = new Map();

let counter = 1;


function initWithItems() {
    items.clear();
    counter = 0;

    createNewItem("Iphone 11", "The brand new Iphone 11", 5000, 0, "0", true);
    createNewItem("Macbook Pro", "Powerful and stylish", 8500, 0, "0", true);
    createNewItem("Playstation 4", "Gaming console", 3400, 4000, "0", true);
    createNewItem("Samsung Galaxy Note 10", "Samsungs great phone", 7000, 8300, "0", true);

}


function createNewItem(name, description, startingPrice, highestBid, userId, available){
    const id = "" + counter;
    counter++;

    available = true;

    const item = {
        id: id,
        name: name,
        description: description,
        startingPrice: startingPrice,
        highestBid: highestBid,
        userId: userId,
        available: available
    };

    items.set(id, item);
    return id;
}


function deleteItem(id) {
    return items.delete(id)
}

function getItem(id) {
    return items.get(id)
}

function getAllItems() {
    return Array.from(items.values())
}

function updateItem(item) {
    if (!items.has(item.id)){
        return false;
    }

    items.set(item.id, item);
    return true;
}

module.exports = {initWithItems, createNewItem, deleteItem, getItem, getAllItems, updateItem};