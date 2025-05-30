"use client"

import { IOrder, IOrderList } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonPrimary, ButtonDanger, ButtonSuccess } from "@/components/button"
import { InputGroupComponent } from "@/components/inputComponent"

import Modal from "@/components/modal"
import Select from "@/components/select"
import FileInput from "@/components/fileInput"

const EditOrder = ({ selectedOrder }: { selectedOrder: IOrder }) => {

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

	const [isShow, setIsShow] = useState<boolean>(false)
	const formRef = useRef<HTMLFormElement>(null)
	const openModal = () => {
		setOrder({...selectedOrder})
		setIsShow(true)
		if (formRef.current) formRef.current.reset()
	}

	const raw = getCookie("cart") || "[]";
	const cart: IOrderList[] = JSON.parse(raw)
	
	const router = useRouter()

	const handleSubmit = async (e: FormEvent) => {
		try {
			console.log(order)
			e.preventDefault()
			const url = `${BASE_API_URL}/order/${selectedOrder.id}`
			const TOKEN = getCookie("token") || ""
			const payload = new FormData()
			payload.append("status", order.status)
			const { data } = await put(url, payload, TOKEN)
			
			if (data?.status) {
				setIsShow(false)
				toast(data?.message, { hideProgressBar: true, containerId: `toastOrder`, type: `success` })
				setTimeout(() => router.refresh(), 100)
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
			<ButtonPrimary type="button" onClick={() => openModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
				</svg>
			</ButtonPrimary>
			<Modal isShow={isShow} onClose={state => setIsShow(state)}>
				<form onSubmit={handleSubmit}>
				{/* modal header */}
				<div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
					<div className="w-full flex items-center">
						<div className="flex flex-col">
							<strong className="font-bold text-2xl">Update Order Status</strong>
							<small className="text-slate-400 text-sm">update the order status, whether they have paid, not yet or done?</small>
						</div>
						<div className="ml-auto">
							<button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
				{/* end modal header */}

				<p className="text-center mt-4">Status</p>
				<Select id={`status`} value={order.status} label=""
					required={false} onChange={val => setOrder({ ...order, status: val })} className="text-center justify-center mx-auto w-[70%]">
					<option value="">--- Select Status ---</option>
					<option value="NEW">New</option>
					<option value="PAID">Paid</option>
					<option value="DONE">Done</option>
				</Select>

				{/* modal footer */}
				<div className="w-full p-5 flex rounded-b-2xl shadow">
					<div className="flex ml-auto gap-2">
						<ButtonDanger type="button" onClick={() => setIsShow(false)}>
							Cancel
						</ButtonDanger>
						<ButtonPrimary type="submit">
							Save
						</ButtonPrimary>
					</div>
				</div>
				{/* end modal footer */}
				</form>
			</Modal>
		</div>
	)
}

export default EditOrder



