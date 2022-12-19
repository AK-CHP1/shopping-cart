/*
This file contains class definitions for item containers
which will control the behaviour of each item being displayed
on the page. All these item containers will inherit from base
`ItemContainer` class and provide methods to change their states
or generating controls.
*/
import { AddToCart, RemoveFromCart } from "./controls.js";


class ItemContainer {
    constructor(dom) {
	this._dom = dom;
	this._id = this._dom.dataset.productId;
    }
    get id() {
	return this._id;
    }
    update(state) { }
    generate_controls(state) {}
}

export class ItemCard extends ItemContainer {
    update(state) {
	let qtyBox = this._dom.querySelector(".quantity");
	let currentCount = state.getProductCount(this.id);
	qtyBox.textContent = currentCount;
    }
    generateControls(state) {
	let addBtn = this._dom.querySelector("i.bi-plus-lg");
	let remBtn = this._dom.querySelector("i.bi-dash-lg");
	// Checking if the button found
	return [
	    new AddToCart(addBtn, this, state),
	    new RemoveFromCart(remBtn, this, state)
	];
    }
    static generateDOM(data) {
	let shopCard = document.createElement("div");
	shopCard.className = "item";
	let {id, name, price, desc, img} = data;
	shopCard.dataset.productId = id;
	shopCard.innerHTML = `
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

	return shopCard;
    }
}
