import { IOrder, IMenu } from "@/app/types"
import { getCookies } from "@/lib/server-cookies"
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "../../../components/search"

import EditOrder from "./editOrder"
import DeleteOrder from "./deleteOrder"
import GetOrderLists from "./getOrderLists"


const MenuPage = async ( { searchParams }: {searchParams: { [key: string]: string | string[] | undefined }} ) => {
	const search = searchParams.search ? searchParams.search.toString() : ``

	// ORDER LOGICS
	const getOrder = async (search: string): Promise<IOrder[]> => {
		try {
			const TOKEN = await getCookies("token")
			const url = `${BASE_API_URL}/order?search=${search}`
			const { data } = await get(url, TOKEN)
			let result: IOrder[] = []
			if (data?.status) result = [ ...data.data ]
			return result 
		} catch (error) {
			console.log(error)
			return []
		}
	}

	const order: IOrder[] = await getOrder(search)
   
	const categoryStatus = (cat: string): React.ReactNode => {
		if (cat === "NEW") {
			return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
				New
			</span>
		}
		if (cat === "PAID") {
			return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
				Paid
			</span>
		}
			return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-200">
			Done
			</span>
	}

	const categoryPayment = (cat: string): React.ReactNode => {
		if (cat === "QRIS") {
			return <span className="bg-blue-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-200">
				Qris
			</span>
		}
		if (cat === "CASH") {
			return <span className="bg-indigo-100 text-cyan-600 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-600 dark:text-cyan-200">
				Cash
			</span>
		}
	}

	const getMenu = async (search: string): Promise<IMenu[]> => {
		try {
			const TOKEN = await getCookies("token");
			const url = `${BASE_API_URL}/menu?search=${search}`;
			const { data } = await get(url, TOKEN);
			return data?.status ? [...data.data] : [];
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const menu: IMenu[] = await getMenu(search);


	return (
		<div>
			<h4 className="text-3xl font-black text-center mt-10">Transaksi 💳</h4>
			<p className="text-base w-[60%] text-secondary my-4 text-center justify-center m-auto">
				This page displays order data, allowing orders to view details, 
				search, and manage order items by adding, editing, or deleting them.
			</p>
			{
				order.length == 0 ?
					<AlertInfo title="informasi">
						No data Available
					</AlertInfo>
				:
				<>
					<div className="m-2">
						{order.map((data, index) => (
							<div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">Id</small> <br />
										{data.id}
								</div>
								<div className="w-full md:w-2/12 p-2">
									<small className="text-sm font-bold text-primary">Customer Name</small> <br />
										{data.customer}
								</div>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">Table Number</small> <br />
										{data.table_number}
								</div>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">Status</small> <br />
										{categoryStatus(data.status)}
								</div>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">Total Price</small> <br />
										${data.total_price}
								</div>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">Payment Method</small> <br />
										{categoryPayment(data.payment_method)}
								</div>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">User ID</small> <br />
										{data.userId}
								</div>
								<div className="w-full md:w-1/12 p-2">
									<small className="text-sm font-bold text-primary">Order Lists</small> <br />
										<GetOrderLists selectedOrderList={data.orderLists} menu={menu}/>
								</div>
								<div className="w-full md:w-2/12 p-2">
									<small className="text-sm font-bold text-primary">Action</small><br />
									<div className="flex gap-1">
										<DeleteOrder selectedOrder={data} />

									</div>
								</div>
						</div>
						))}
					</div>
				</>
			}

		</div>
	)
}
export default MenuPage
  