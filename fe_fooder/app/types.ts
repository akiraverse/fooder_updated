export interface IMenu {
	id : number,
	uuid : string,
	name : string,
	price : number,
	picture : string,
	description : string,
	category : string,
	createdAt : string,
	updatedAt : string
}

export interface IUser {
	id : number,
	uuid : string,
	name : string,
	email : string,
	password : string,
	profile_picture : string,
	role : string,
	createdAt : string,
	updatedAt : string
}

export interface IOrder {
	id: number, 
	uuid: string, 
	customer: string, 
	table_number: number, 
	total_price: number, 
	payment_method: string,
	status: string,
	createdAt : string,
	updatedAt : string
	orderLists: [], 
	userId: number
}

export interface IOrderList {
	quantity: number,
	note: string,
	menuId?: number,
}
  
  