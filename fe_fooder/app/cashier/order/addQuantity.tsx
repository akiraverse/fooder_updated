"use client"

import { IMenu } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global"
import { ButtonPrimary, ButtonSuccess } from "@/components/button"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "../../../components/search"
import React, { useState } from "react"
import { getCartFromCookie, updateCartInCookie } from "@/lib/cart-cookies"
import { useRouter } from "next/navigation"
import { InputGroupComponent } from "@/components/inputComponent"



const AddQuantity = ({ selectedMenu }: { selectedMenu: IMenu }) => {
	const [quantity, setQuantity] = useState(0)
	const [menuNote, setMenuNote] = useState("")
	const router = useRouter()

	const update = (newQty: number) => {
		setQuantity(newQty);
		updateCartInCookie(selectedMenu.id, newQty, menuNote);
		router.refresh();
	};

	const handleAdd = () => {
		update(1)
		setMenuNote("")
	};
	const handleIncrement = () => update(quantity + 1);
	const handleDecrement = () => update(quantity - 1);

	return (
		<div className="w-full">
			{ quantity == 0 ? (
					<ButtonPrimary type="button" onClick={handleAdd} className="w-full mt-auto justify-self-start">
						+ Add Product
					</ButtonPrimary>
				) : (
					<div>
						<div className="w-full flex flex-wrap">
							<ButtonPrimary type="button" onClick={handleDecrement} className="justify-self-start w-1/3">
								-
							</ButtonPrimary>
							<div className="justify-self-center m-auto">{quantity}</div>
							<ButtonPrimary type="button" onClick={handleIncrement} className="justify-self-end w-1/3">
								+ 
							</ButtonPrimary>
						</div>
						<div>
							<InputGroupComponent id={`note`} type="text" value={menuNote || ` `}
							onChange={(value: string) => {
								setMenuNote(value);
								updateCartInCookie(selectedMenu.id, quantity, value);
								router.refresh();
							}}
							required={true} 
							label="note"
							placeholder="e.g. make it spicy"/>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default AddQuantity


