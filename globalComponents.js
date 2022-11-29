/*
This file contains class definitions for the global 
components of the application which will be dependent 
on the `AppState` class to change their state
*/

/*
The `CartButton` class is used to manage the state
of the cart icon which will be displayed on the top right
corner of the screen
*/
class CartButton {
    constructor(dom) {
	this._dom = dom;
	this._qtyBox = dom.querySelector(".cart-amount");
    }
    update(state) {
	let currentItemsCount = state.totalItemsCount;
	this._qtyBox.textContent = currentItemsCount;
	// The item count of cart should only be displayed if there
	// is at least one item in the cart
	if (currentItemsCount) {
	    this._qtyBox.style.display = "block";
	} else {
	    this._qtyBox.style.display = "none";
	}
    }
}

