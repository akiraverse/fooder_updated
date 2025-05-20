import { IMenu } from "@/app/types"
import { getCookies } from "@/lib/server-cookies"
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "../../../components/search"

const MenuPage = async ( { searchParams }: {searchParams: { [key: string]: string | string[] | undefined }} ) => {
	const search = searchParams.search ? searchParams.search.toString() : ``

	// FUNCTION TO GET THE MENU
	const getMenu = async (search: string): Promise<IMenu[]> => {
		try {
			const TOKEN = await getCookies("token")
			const url = `${BASE_API_URL}/menu?search=${search}`
			const { data } = await get(url, TOKEN)
			let result: IMenu[] = []
			if (data?.status) result = [ ...data.data ]
			return result 
		} catch (error) {
			console.log(error)
			return []
		}
	}

	const menu: IMenu[] = await getMenu(search)

	const category = (cat: string): React.ReactNode => {
		if (cat === "FOOD") {
			return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
				Food
			</span>
		}
		if (cat === "SNACK") {
			return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
				Snack
			</span>
		}
			return <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-200">
			Drink
			</span>
	}
   

	return (
			<div className="w-full h-full bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
				<h4 className="text-3xl font-black text-center mt-10">Food 🍕 and Drinks 🥤 </h4>
				<p className="text-base w-[60%] text-secondary my-4 text-center justify-center m-auto">
					This page displays menu data, allowing menus to view details, 
					search, and manage menu items by adding, editing, or deleting them.
				</p>
				<div className="flex items-center justify-center mb-10">
					{/* Search Bar */}
					<div className="flex items-center justify-center w-full max-w-md flex-grow">
							<Search url={`/manager/menu`} search={search} />
					</div>
				</div>

				
				{
					menu.length == 0 ?
						<AlertInfo title="informasi">
							No data Available
						</AlertInfo>
					:
					<>
						<div className="m-2">
							{menu.map((data, index) => (
								<div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
									<div className="w-full md:w-2/12 p-2">
										<small className="text-sm font-bold text-primary">Picture</small><br />
										<Image width={200} height={170} src={`${BASE_IMAGE_MENU}/${data.picture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
									</div>
									<div className="w-full md:w-1/12 p-2">
										<small className="text-sm font-bold text-primary">Menu ID</small> <br />
										{data.id}
									</div>
									<div className="w-full md:w-1/12 p-2">
										<small className="text-sm font-bold text-primary">Name</small> <br />
											{data.name}
									</div>
									<div className="w-full md:w-1/12 p-2">
										<small className="text-sm font-bold text-primary">Price</small> <br />
											${data.price}
									</div>
									<div className="w-full md:w-4/12 p-2">
										<small className="text-sm font-bold text-primary">Description</small> <br />
											{data.description}
									</div>
									<div className="w-full md:w-1/12 p-2">
										<small className="text-sm font-bold text-primary">Category</small> <br />
										{category(data.category)}
									</div>
									<div className="w-full md:w-2/12 p-2">
										<small className="text-sm font-bold text-primary">Action</small><br />
										<div className="flex gap-1">
											none
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
  