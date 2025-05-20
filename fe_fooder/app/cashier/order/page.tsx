import { IMenu, IOrderList } from "@/app/types"
import { getCookies } from "@/lib/server-cookies"
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global"
import { ButtonPrimary, ButtonSuccess } from "@/components/button"
import { get, post } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "../../../components/search"
import { InputGroupComponent } from "@/components/inputComponent"
import { cookies } from "next/headers";
import ClearCartOnMount from "./clearCartCookie"
import { getCartFromCookie } from "@/lib/cart-cookies"

import AddQuantity from "./addQuantity"
import SmallerCard from "./smallerCard"
import AddOrder from "./addOrder"

export const dynamic = 'force-dynamic'; // 👈 Add this


const MenuPage = async ( { searchParams }: {searchParams: { [key: string]: string | string[] | undefined }} ) => {
	const search = searchParams.search ? searchParams.search.toString() : ``

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

	if (searchParams.clear === "true") {
		(await cookies()).delete("cart");
	}

	const cartCookie = (await cookies()).get("cart");
	const cartRaw = cartCookie?.value ? JSON.parse(cartCookie.value) : {};
	const cart = Array.isArray(cartRaw) ? cartRaw : Object.values(cartRaw);
 
	return (
		<>
			<ClearCartOnMount />
			<div className="w-full h-full bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
				<h4 className="text-3xl font-black text-center mt-10">Ordering System 💻</h4>
				<p className="text-base w-[60%] text-secondary my-4 text-center justify-center m-auto">
					This page displays menu data, allowing menus to view details, 
					search, and manage menu items by adding, editing, or deleting them.
				</p>
				<div className="flex items-center justify-center mb-10">
					{/* Search Bar */}
					{/* <div className="flex items-center justify-center w-full max-w-md flex-grow">
							<Search url={`/manager/menu`} search={search} />
					</div> */}
				</div>

				
				<div className="flex flex-row">
					{
						menu.length == 0 ?
							<AlertInfo title="informasi">
								No data Available
							</AlertInfo>
						:
						<>
							<div className="w-[60%] flex flex-wrap justify-center">
								{menu.map((data, index) => (
									<div key={data.id || index} className="w-72 h-auto bg-white-50 rounded-xl p-6 shadow-md border border-white-100 mx-3 mb-6">
										<div className="h-2/4 overflow-hidden rounded-lg border-4 border-slate-500">
											<img
											src={`${BASE_IMAGE_MENU}/${data.picture}`} // Replace with the actual image path
											alt={`${data.picture}`}
											className="w-full h-full object-cover"
											/>
										</div>
									
										<div className="flex flex-col flex-grow pt-5 h-2/4">
											<div className="flex justify-between items-center">
												<h3 className="font-semibold text-lg text-gray-800">{data.name}</h3>
												<span className="text-slate-500 font-bold text-lg">${data.price}</span>
											</div>
												<p className="text-gray-500 text-sm mt-1">{data.description}</p>
											<div className="mt-auto flex justify-between items-baseline w-full">
												<AddQuantity selectedMenu={data}/>
											</div>
										</div>
									</div>
								))}
							</div>
						</>
					}

					<div className="w-[40%] h-full rounded-xl p-5 bg-white space-y-4 shadow-lg border border-white-10 mx-3">
						<div>
							<h5 className="text-2xl font-black text-slate-700 mb-3 text-center">Order Form 📝</h5>
							{Object(cart).length === 0 ? (
								<p>No items in cart</p>
							) : (
								<ul>
									{
										cart.map((item, index) => {
											return Number(item.quantity) > 0 ? (
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
							<div>
								Total: $
								{cart.reduce((total, item) => {
								const menuItem = menu[Number(item.menuId) -1]; // Ensure menuId is correctly parsed
								const quantity = Number(item.quantity); // Direct access to quantity
								return menuItem && quantity > 0 ? total + menuItem.price * quantity : total;
								}, 0).toFixed(2)}
							</div>


							<AddOrder
								selectedOrderList={cart || []}
							/>


					</div>
				</div>
			</div>
		</>
	)
}
export default MenuPage
  