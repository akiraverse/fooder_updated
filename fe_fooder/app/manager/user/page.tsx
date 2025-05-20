import { IUser } from "@/app/types"
import { getCookies } from "@/lib/server-cookies"
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert"
import Image from "next/image"
import Search from "../../../components/search"

import AddUser from "./addUser"
import EditUser from "./editUser"
import DeleteUser from "./deleteUser"

const UserPage = async ( { searchParams }: {searchParams: { [key: string]: string | string[] | undefined }} ) => {
	const search = typeof searchParams.search === "string" ? searchParams.search : "";

	// FUNCTION TO GET THE User
	const getUser = async (search: string): Promise<IUser[]> => {
		try {
			const TOKEN = await getCookies("token")
			const url = `${BASE_API_URL}/user?search=${search}`
			const { data } = await get(url, TOKEN)
			let result: IUser[] = []
			if (data?.status) result = [ ...data.data ]
			return result 
		} catch (error) {
			console.log(error)
			return []
		}
	}

	const user: IUser[] = await getUser(search)

	const Role = (role: string): React.ReactNode => {
		if (role === "MANAGER") {
			return <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
				Manager
			</span>
		}
		if (role === "CASHIER") {
			return <span className="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
				Cashier
			</span>
		}
	}
   

	return (
			<div className="w-full h-full bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md">
				<h4 className="text-3xl font-black text-center mt-10">Human Resources 🕵🏻</h4>
				<p className="text-base w-[60%] text-secondary my-4 text-center justify-center m-auto">
					This page displays User data, allowing Users to view details, 
					search, and manage User items by adding, editing, or deleting them.
				</p>
				<div className="flex items-center justify-center mb-10">
					{/* Search Bar */}
					<div className="flex items-center justify-center w-full max-w-md flex-grow">
							<Search url={`/manager/user`} search={search} />
					</div>

					<div className="ml-4">
						<AddUser />
					</div>
				</div>
				
				{
					user.length == 0 ?
						<AlertInfo title="informasi">
							No data Available
						</AlertInfo>
					:
					<>
						<div className="m-2">
							{user.map((data, index) => (
								<div key={`keyPrestasi${index}`} className={`flex flex-wrap shadow m-2`}>
									<div className="w-full md:w-2/12 p-2">
										<small className="text-sm font-bold text-primary">Picture</small><br />
										<Image width={200} height={170} src={`${BASE_IMAGE_PROFILE}/${data.profile_picture}`} className="rounded-sm overflow-hidden" alt="preview" unoptimized />
									</div>
									<div className="w-full md:w-1/12 p-2">
										<small className="text-sm font-bold text-primary">User ID</small> <br />
										{data.id}
									</div>
									<div className="w-full md:w-2/12 p-2">
										<small className="text-sm font-bold text-primary">Name</small> <br />
										{data.name}
									</div>
									<div className="w-full md:w-3/12 p-2">
										<small className="text-sm font-bold text-primary">Email</small> <br />
										{data.email}
									</div>
									<div className="w-full md:w-2/12 p-2">
										<small className="text-sm font-bold text-primary">Role</small> <br />
										{Role(data.role)}
									</div>
									<div className="w-full md:w-2/12 p-2">
										<small className="text-sm font-bold text-primary">Action</small><br />
										<div className="flex gap-1">
											<EditUser selectedUser={data} />
											<DeleteUser selectedUser={data} />
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

export default UserPage
  