
const items = new Map();

let counter = 0;


function initWithItems() {
    items.clear();
    counter = 0;

    createNewItem("Iphone 11", "The brand new Iphone 11", 5000, 0);
    createNewItem("Macbook Pro", "Powerful and stylish", 8500, 0);
    createNewItem("Playstation 4", "Gaming console", 3400, 4000);
    createNewItem("Samsung Galaxy Note 10", "Samsungs great phone", 7000, 8300);

}


function createNewItem(name, description, startingPrice, highestBid){
    const id = "" + counter;
    counter++;

    const item = {
        id: id,
        name: name,
        description: description,
        startingPrice: startingPrice,
        highestBid: highestBid
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