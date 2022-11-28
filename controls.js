/*
This file contains controls for the application
with which user is gona interact and change the 
state of the application
*/

/*
The `CartModifier` control will add/remove a product to the cart
and also change the the shop item to display it's count 
present in the cart
*/

class CartModifier {
    construcftor(dom, item, state) {
	this._dom = dom;
	this._bindedItem = item;
	this._state = state;
	this.initialize();
    }
    initialize() { }
}

class AddToCart extends CartModifier {
    initialize() {
	this._dom.addEventListener("click", () => {
	    this._state.updateCart(this._bindedItem.id, 1);
	    this._bindedItem.update();
	}, false);
    }
}
class RemoveFromCart extends CartModifier {
    initialize() {
	this._dom.addEventListener("click", () => {
	    this._state.updateCart(this._bindedItem.id, -1);
	    this._bindedItem.update();
	}, false);
    }
}
