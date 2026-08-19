
const itemName = document.getElementById("itemName");
const itemQuantity = document.getElementById("itemQuantity");
const addButton = document.getElementById("addButton");
const searchInput = document.getElementById("searchInput");
const shoppingList = document.getElementById("shoppingList");
const totalItems = document.getElementById("totalItems");
const emptyMessage = document.getElementById("emptyMessage");

let items = JSON.parse(localStorage.getItem("shoppingItems")) || [];

function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
}

function displayItems() {
    shoppingList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    const filteredItems = items
        .map((item, index) => ({ ...item, index }))
        .filter(item => item.name.toLowerCase().includes(searchText));

    filteredItems.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${item.name} - Quantity: ${item.quantity}
            </span>
            <button onclick="deleteItem(${item.index})">
                Delete
            </button>
        `;

        shoppingList.appendChild(li);
    });

    totalItems.textContent = items.length;

    if (items.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = filteredItems.length === 0 ? "block" : "none";
    }
}

addButton.addEventListener("click", function () {
    const name = itemName.value.trim();
    const quantity = itemQuantity.value.trim();

    if (name === "") {
        alert("Please enter an item.");
        return;
    }

    if (quantity === "" || Number(quantity) <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    items.push({
        name: name,
        quantity: Number(quantity)
    });

    itemName.value = "";
    itemQuantity.value = "";

    saveItems();
    displayItems();
});

function deleteItem(index) {
    items.splice(index, 1);

    saveItems();
    displayItems();
}

searchInput.addEventListener("input", displayItems);

displayItems();
