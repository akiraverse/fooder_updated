"use client"

import { IOrder, IOrderList } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonPrimary, ButtonSuccess, ButtonDanger } from "@/components/button"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/modal"
import Select from "@/components/select"
import FileInput from "@/components/fileInput"
import AddQuantity from "./addQuantity"
import { list } from "postcss"
import { cookies } from "next/headers";



const AddOrder = ({ selectedOrderList }: {selectedOrderList: any[]}) => {

	const [order, setOrder] = useState<IOrder>({
		id: 0, 
		uuid : ``, 
		customer: ``, 
		table_number: 0, 
		total_price: 0, 
		payment_method: ``,
		status: ``,
		createdAt : ``,
		updatedAt : ``,
		orderLists: [], 
		userId: 0
	})

	const raw = getCookie("cart") || "[]";
	const cart: IOrderList[] = JSON.parse(raw)
	
	const router = useRouter()
	const TOKEN = getCookie("token") || ""
	const formRef = useRef<HTMLFormElement>(null)

	const handleSubmit = async (e: FormEvent) => {
		try {
			console.log(order)
			e.preventDefault()
			const url = `${BASE_API_URL}/order`
			const {customer, table_number, payment_method, userId, status} = order 

			const payload = {
				customer,
				table_number,
				payment_method,
				status,
				userId,
				orderlists: cart.map(({ menuId, quantity, note }) => ({
					menuId,
					quantity,
					note,
				})),
			};

			const { data } = await post(url, JSON.stringify(payload), TOKEN)

			console.log("HERE IS THE DATA")
			console.log(data)
			
			if (data?.status) {
				toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `success` })
			} else {
				console.log(data?.message)
				toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `warning` })
			}
		} catch (error) {
			console.log(error);
			toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastOrder`, type: `error` })
		}
	}

	return (
		<div>
			<ToastContainer containerId={`toastOrder`} />
			<form onSubmit={handleSubmit} className="space-y-5">

				<InputGroupComponent id={`customer`} type="text" value={order.customer}
					onChange={val => setOrder({ ...order, customer: val })}
					required={true} label="Customer" />

				<InputGroupComponent id={`table_number`} type="text" value={order.table_number.toString()}
					onChange={val => setOrder({ ...order, table_number: Number(val) })}
					required={true} label="Table Number" />

				<InputGroupComponent id={`userId`} type="number" value={order.userId.toString()}
					onChange={val => setOrder({ ...order, userId: Number(val) })}
					required={true} label="Cashier / Manager Id" />
				
				<Select id={`payment_method`} value={order.payment_method} label="Payment Method"
					required={true} onChange={val => setOrder({ ...order, payment_method: val })}>
					<option value="">--- Select Payment Method ---</option>
					<option value="CASH">Cash</option>
					<option value="QRIS">Qris</option>
				</Select>

				<Select id={`status`} value={order.status} label="Status"
					required={true} onChange={val => setOrder({ ...order, status: val })}>
					<option value="">--- Select Status ---</option>
					<option value="NEW">New</option>
					<option value="PAID">Paid</option>
					<option value="DONE">Done</option>
				</Select>

				<ButtonPrimary type="submit" onClick={() => (router.refresh())} className="w-full py-3">
					Order
				</ButtonPrimary>
			</form>
		</div>
	)
}

export default AddOrder