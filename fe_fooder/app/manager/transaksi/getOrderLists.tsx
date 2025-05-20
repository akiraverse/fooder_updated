"use client"

import { IOrderList, IMenu} from "@/app/types"
import { BASE_API_URL } from "@/global"
import { drop } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonPrimary, ButtonDanger } from "@/components/button"

import Modal from "@/components/modal"
import SmallerCard from "../order/smallerCard"

const GetOrderLists = ({ selectedOrderList, menu }: {selectedOrderList: IOrderList[], menu: IMenu[]}) => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const [order, setOrder] = useState<IOrderList[]>({...selectedOrderList})
	const router = useRouter()
	const TOKEN = getCookie("token") || ""
	const openModal = () => {
		setOrder({...selectedOrderList})
		setIsShow(true)
	}

	return (
		<div>
			<ToastContainer containerId={`toastorder`} />
			<ButtonPrimary type="button" onClick={() => openModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
				<path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
				</svg>
			</ButtonPrimary>
			<Modal isShow={isShow} onClose={state => setIsShow(state)}>
				<div className="sticky top-0 bg-white px-5 pt-5">
					<div className="w-full flex items-center">
						<div className="ml-auto">
							<button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div>
					<h5 className="text-2xl font-black text-slate-700 mb-3 text-center">Detail Orders 📝</h5>
					{Object(selectedOrderList).length === 0 ? (
						<p>No items in cart</p>
					) : (
						<ul>
							{
								selectedOrderList.map((item, index) => {
									return Number(item?.quantity) > 0 ? (
										<SmallerCard 
											key={Number(item.menuId) - 1} 
											quantity={Number(item.quantity)} 
											product={menu[Number(item.menuId) - 1]} 
											note={item.note || " "} 
										/>
									) : (
										<li key={index}></li> // Add a key to the <li> element as well
									);
								})

							}
						</ul>
					)}
				</div>

			</Modal>
		</div>
	)
	    
}
export default GetOrderLists


