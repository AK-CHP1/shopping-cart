const shop = document.querySelector(".shop");
const basket = new Map();

function createShopItem(data) {
    let shopItem = document.createElement("div");
    shopItem.className = "item";

    let {id, name, price, desc, img} = data;
    shopItem.dataset.pid = id;
    shopItem.innerHTML = `
    <img src="${img}" width="220px" alt="${name}">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i class="bi bi-dash-lg"></i>
                <div class="quantity">0</div>
                <i class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
    `;
    return shopItem;
}

function changeQuantity(item, changeBy) {
    
    quantity = item.querySelector(".quantity");
    let newQuantity = Number(quantity.textContent) + changeBy;
    if (newQuantity >= 0) {
        quantity.textContent = newQuantity;
        return newQuantity;
    }
    return 0;
}

function updateCartAmount() {
    let total = Array.from(basket.values()).reduce((a, b) => a + b, 0);
    let cartAmount = document.querySelector(".cart-amount");
    cartAmount.textContent = total;
    if (total > 0) {
        cartAmount.style.display = "block";
    } else {
        cartAmount.style.display = "none";
    }
}

let shopItems = shopItemsData.map(createShopItem);
for (let item of shopItems) {
    shop.appendChild(item);
}
shopItems.forEach(item => {
    item.addEventListener("click", event => {
        let change = 0;
        let incButton = item.querySelector(".buttons>.bi-plus-lg");
        let decButton = item.querySelector(".buttons>.bi-dash-lg");
        if (event.target === incButton) {
            change++;
        } else if (event.target === decButton) {
            change--;
        } else {
            return;
        }
        let newQuantity = changeQuantity(item, change);
        basket.set(item.dataset.pid, newQuantity);
        updateCartAmount();      
    })
})