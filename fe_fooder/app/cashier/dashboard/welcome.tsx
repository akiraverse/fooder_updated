"use client"

import { useState, useEffect } from 'react';
import { IUser } from '@/app/types';
import { BASE_API_URL } from '@/global';
import axios from 'axios';
import { getCookie } from '@/lib/client-cookies';


interface User {
	data: {
		name: string,
		email: string,
		password: string,
		role: string,
	}
}

const Welcome = () => {
	const [user, setUser] = useState<User | null>(null)

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
		<div className="">
			<h5 className='text-2xl font-semibold text-center justify-center mx-auto my-5'>Welcome <span className='font-thin'>{user?.data.name} [<span className='lowercase'>{user?.data.role}</span>]</span></h5>
		</div> 
	)
}
export default Welcome