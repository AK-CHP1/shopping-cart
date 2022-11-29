import { shopItemsData as appData } from "./data.js";
import { AppState } from "./state.js";
import { ItemCard } from "./itemContainers.js";
import { CartButton } from "./globalComponents.js";


class ShopGenerator {
    constructor(dom) {
	this._dom = dom;
    }
    generateShop(data) {
	let nodes = [];
	for (let item of data) {
	    let dom = ItemCard.generateDOM(item);
	    nodes.push(dom);
	    this._dom.appendChild(dom);
	}
	let cards = [];
	for (let item of nodes) {
	    cards.push(new ItemCard(item));
	}
	return cards;
    }
}

// Generating the shop
const shop = document.querySelector(".shop");
let shopGenerator = new ShopGenerator(shop);
let cards = shopGenerator.generateShop(appData);

// Generating the cart button
const cartDOM = document.querySelector(".cart");
let cartBtn = new CartButton(cartDOM);

// Initializing the application state
const state = new AppState([cartBtn]);

// Generating the controls
let controls = [];
for (let card of cards) {
    controls.push(card.generateControls());
}

