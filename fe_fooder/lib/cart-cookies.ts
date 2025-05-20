// lib/cart-client.ts

import { getCookie, setCookie, deleteCookie } from "cookies-next";

// Define the type of each cart item
// Define the type of each cart item
export type CartItem = {
  menuId: number;
  quantity: number;
  note: string;
};

// Now cart is just an array of CartItems
export type Cart = CartItem[];


export const getCartFromCookie = (): Cart => {
	const raw = getCookie("cart");
	if (!raw) return [];
	try {
		return JSON.parse(raw as string);
	} catch {
		return [];
	}
};


export const updateCartInCookie = (menuId: number, quantity: number, note: string) => {
	let cart = getCartFromCookie();

	// Remove item if quantity is 0 or less
	if (quantity <= 0) {
		cart = cart.filter(item => item.menuId !== menuId);
	} else {
		const index = cart.findIndex(item => item.menuId === menuId);
		const updatedItem = { menuId, quantity, note };

		if (index !== -1) {
			cart[index] = updatedItem; // update existing
		} else {
			cart.push(updatedItem); // add new
		}
	}

	setCookie("cart", JSON.stringify(cart));
};


// /utils/cart-cookie.ts
export const clearCartCookie = () => {
	document.cookie = "cart=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};
   