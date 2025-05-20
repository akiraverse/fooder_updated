"use client"

import { ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import MenuItem from "./menuItem"
import Logo from '../../public/image/logo-restaurant.png'
import Profile from '../../public/image/profile.jpeg'
import { removeCookie } from "@/lib/client-cookies"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BASE_API_URL } from "@/global"
import { IUser } from "@/app/types"
import { BASE_IMAGE_PROFILE } from "@/global"

type MenuType = {
	id: string,
	icon: ReactNode
	path: string,
	label: string
}
  
type ManagerProp = {
	children: ReactNode,
	id: string,
	title: string,
	menuList: MenuType[]
}

interface User {
	data: {
		name: string,
		email: string,
		password: string,
		role: string,
		profile_picture: string
	}
}

const Sidebar = ({ children, id, title, menuList }: ManagerProp) => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [user, setUser] = useState<User | null>(null)
	const toggleDropdown = () => {
	    setIsDropdownOpen(!isDropdownOpen);
	};

	const router = useRouter()

	const handleLogout = () => {
		removeCookie("token")
		removeCookie("id")
		removeCookie("name")
		removeCookie("role")
		router.replace(`/login`)
	};

	useEffect(() => {
		const TOKEN = getCookie("token");
	
		if (!TOKEN) return;
	
		const fetchUserProfile = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}/user/profile`, {
				headers: { Authorization: `Bearer ${TOKEN}` },
			});
			setUser(response.data);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
		};
	
		fetchUserProfile();
	}, []); 

	return (
		<div className="w-full min-h-dvh bg-slate-50 text-slate-800">
			{/* header section */}
			<header className="p-4 flex justify-between items-center mb-0 bg-primary shadow-md">
				<div className="flex gap-2">
					<button onClick={() => setIsShow(true)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
						</svg>
					</button>
					<h1 className="font-bold text-xl ">
						{title}
					</h1>
				</div>

				<button className="font-bold flex flex-row" onClick={handleLogout}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
					</svg>
					Logout
				</button>

			</header>
			{/* end header section */}

			{/* content section */}
			<div className="p-4">
				{children}
			</div>
			{/* end content section */}

			{/* sidebar section */}
			<div className={`flex flex-col w-2/3 md:w-1/2 lg:w-1/4 h-full fixed top-0 right-full transition-transform z-50
           bg-white border-r border-primary ${isShow ? `translate-x-full` : ``}`}>

				{/* close button */}
				<div className="ml-auto p-2">
					<button onClick={() => setIsShow(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
							<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
					</button>
				</div>
				{/* end close button */}

				{/* logo section */}
				<div className="mb-3 w-full flex justify-center">
					<div className="flex items-center space-x-4">
						<Image src={Logo} alt="Logo" width={60} height={60} />
						<h1 className="text-2xl font-bold text-slate-700">Fooder</h1>
					</div>
				</div>
				{/* end logo section */}

				{/* user section */}
				<div className="w-full mt-10 mb-6 bg-primary text-white p-3 py-5 flex space-x-3 items-center justify-center bg-slate-700">
					<Image src={`${BASE_IMAGE_PROFILE}/${user?.data.profile_picture}` || Profile} alt="Profile" width={50} height={50} className="rounded-full" />
					<div className="space-y-[-4px]">
						<h5 className="text-base font-semibold">{user?.data.name || "no name"}</h5>
						<p className="text-sm lowercase">{user?.data.role || "no role"}</p>
					</div>
				</div>
				{/* end user section */}

				{/* menu section */}
				<div className="w-full p-2 overflow-y-auto">
					<div className="px-5">
						{
							menuList.map((menu, index) => (
								<MenuItem icon={menu.icon} label={menu.label} path={menu.path} active={menu.id === id} key={`keyMenu${index}`} />
							))
						}
					</div>
				</div>
				{/* menu section */}

			</div>
			{/* end sidebar section */}

		</div>
	)
}

export default Sidebar
  
  
