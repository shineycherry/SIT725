const socket = io();

// Listen for new item added
socket.on('itemAdded', (item) => {
    console.log('New Item:', item);
    alert(`New Item Added: ${item.title}`);

    // Optional: Dynamically update inventory list without refreshing
    const inventoryList = document.getElementById('inventory-list');
    const newItem = document.createElement('div');
    newItem.classList.add('card-panel', 'teal', 'lighten-2');
    newItem.style.marginTop = "10px";
    newItem.innerHTML = `<strong>${item.title}</strong><br>${item.description}`;
    inventoryList.prepend(newItem);
});
