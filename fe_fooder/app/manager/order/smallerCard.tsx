"use client"

import { BASE_IMAGE_MENU } from "@/global"
import { InputGroupComponent } from "@/components/inputComponent";
import { useState } from "react";
import { updateCartInCookie } from "@/lib/cart-cookies";
import { useRouter } from "next/navigation";
import { ButtonPrimary } from "@/components/button";

interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	picture: string;
}

interface SmallerCardProps {
	product: Product;
	quantity: number;
	note: string;
}
   
const SmallerCard: React.FC <SmallerCardProps> = ({ product, quantity, note }) => {
	const subtotal = product?.price * quantity;
	const router = useRouter()
	

	return (
		<div className="flex items-start gap-5 border p-2 bg-white text-slate-700 w-full h-auto">
			<div className="h-full w-1/3">	
				<img src={`${BASE_IMAGE_MENU}/${product?.picture}`} alt={product?.name} className="object-cover w-full h-full rounded-sm" />
			</div>
			
			<div className="h-full w-2/3 text-sm">
				<div>
					<strong>{product?.name}</strong> <span className="text-orange-400">${product?.price.toFixed(2)}</span>
				</div>
				<div className="text-gray-400 text-xs">{product?.description}</div>
				<div className="w-full text-sm"><span className="justify-start">Qty:</span> <span className="justify-end mx-auto">{quantity}x</span></div>
				<div className="w-full text-sm"><span className="justify-start">Sub Total:</span> <span className="mx-auto justify-end"><strong>${subtotal.toFixed(2)}</strong></span></div>
				<div className="whitespace-nowrap overflow-hidden max-w-full text-ellipsis block text-sm"><span className="justify-start">Note:</span> <span className="mx-auto w-10 text- text-wrap justify-end">{note}</span></div>

			</div>

		</div>
	);
};

export default SmallerCard;
   