"use client"

import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next/client';
import { get } from '@/lib/api-bridge';
import { BASE_API_URL } from '@/global';
import { IOrder, IOrderList, IMenu } from '@/app/types';
import { totalmem } from 'os';
import { ResponsiveContainer } from 'recharts';


const DisplayChart = () => {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [menus, setMenus] = useState<IMenu[]>([]);

	useEffect(() => {
	const fetchOrders = async () => {
		try {
		const TOKEN = await getCookie('token') || "";
		const url = `${BASE_API_URL}/order`;
		const { data } = await get(url, TOKEN);

		if (data?.status) {
			setOrders(data.data);
		}
		} catch (error) {
		console.error(error);
		setOrders([]);
		}
	};

	fetchOrders();
	}, []);

	useEffect(() => {
	const fetchMenus = async () => {
		try {
		const TOKEN = await getCookie('token') || "";
		const url = `${BASE_API_URL}/menu`;
		const { data } = await get(url, TOKEN);

		if (data?.status) {
			setMenus(data.data);
		}
		} catch (error) {
		console.error(error);
		setMenus([]);
		}
	};

	fetchMenus();
	}, []);




	const menuItems = orders.flatMap(order =>
		order.orderLists.map((item: IOrderList) => ({
		menuId: item.menuId,
		quantity: item.quantity,
		}))
	);

	const groupedMenu: Record<string, number> = {};

	menuItems.forEach(item => {
		const index = Number(item.menuId) - 1;
		const menu = menus[index];

		if (!menu || !menu.name) return;

		const name = menu.name;

		groupedMenu[name] = (groupedMenu[name] || 0) + item.quantity;
	});

	const groupedPayment: Record<string, number> = {
		"CASH": 0,
		"QRIS": 0,
	};

	orders.forEach(item => {
		groupedPayment[item.payment_method] = (groupedPayment[item.payment_method] || 0) + 1;
	});




	const pieData1 = Object.entries(groupedMenu).map(([menu, quantity]) => ({
		name: menu, 
		value: quantity,
	}));

	const pieData2 = Object.entries(groupedPayment).map(([payment_method, quantity]) => ({
		name: payment_method, 
		value: quantity,
	}));

	const histData = Object.entries(orders).map(([index, item]) => ({
		name: item.customer, 
		value: item.total_price,
	}));  



	const blueGradients = [
		"#cce4f6", // Lightest blue
		"#99c9ec",
		"#66afe3",
		"#3394d9",
		"#0079cf", // Strong blue
		"#005c9e"  // Darkest blue
	];



	
	return (
		<div className='flex flex-wrap sans-serif text-slate-700'>
			<div className="w-full h-[400px] flex flex-wrap justify-center">
				<ResponsiveContainer width="33%" height="100%">
					<PieChart>
						<Pie
						data={pieData1}
						cx="50%"
						cy="50%"
						innerRadius={0}
						outerRadius={100}
						paddingAngle={0}
						dataKey="value"
						nameKey="name"
						label={({ name }) => name}
						fontSize={14}
						>
						{pieData1.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={blueGradients[index % blueGradients.length]} />
						))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="33%" height="100%">
					<PieChart>
						<Pie
						data={pieData2}
						cx="50%"
						cy="50%"
						innerRadius={0}
						outerRadius={100}
						paddingAngle={0}
						dataKey="value"
						nameKey="name"
						label={({ name }) => name}
						fontSize={14}
						>
						{pieData2.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={blueGradients[index + 1 % blueGradients.length]} />
						))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="33%" height="100%" className="py-10 text-slate-500">
					<BarChart
						data={histData}
						margin={{ top: 30, right: 10, left: 10, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" name="total price" fill="#99c9ec" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
export default DisplayChart
  