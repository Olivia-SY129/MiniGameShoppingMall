// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json())
    // .then(json => console.log(json))
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
    const container = document.getElementsByClassName('items');
    container[0].innerHTML = items.map(item => createHTMLString(item)).join('');
    console.log(container[0]);
    console.log(items.image);
}

// Create HTML list item from the given data item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// event onclick
function onButtonClick(event, items) {
    const dataset = event.target.dataset
    // console.log(dataset);
    const key = dataset.key
    const value = dataset.value
    
    // if(key === null || value === null) {
    //     return;
    // }
    // const filtered = items.filter(item => item[key] === value);
    // console.log(filtered);
    // displayItems(filtered);

    if (key === null || value === null) {
        return;
    }
    const itemCollection = document.getElementsByClassName("item");
    
    items.forEach(
        function(item, index) {
            const match = item[key];
            if (match === value) {
                itemCollection[index].classList.remove("invisible");
            } else {
                itemCollection[index].classList.add("invisible");
            }
        }
    );
    //console.log(itemCollection);
}

// Event Listener
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', () => onButtonClick(event, items));

}

// Main
loadItems()
    .then(items => {
        // console.log(items)
        displayItems(items);
        setEventListeners(items);
})
    .catch(console.log);