"use client"

import { IUser } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ButtonPrimary, ButtonDanger, ButtonSuccess } from "@/components/button"
import { InputGroupComponent } from "@/components/inputComponent"
import { useEffect } from "react"
import Modal from "@/components/modal"
import Select from "@/components/select"
import FileInput from "@/components/fileInput"

const EditUser = ({ selectedUser }: { selectedUser: IUser }) => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const [user, setUser] = useState<IUser>({...selectedUser})
	const router = useRouter()
	const TOKEN = getCookie("token") || ""
	const formRef = useRef<HTMLFormElement>(null)
	const [showPasswordField, setShowPasswordField] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [passwordInput, setPasswordInput] = useState<string>("");


	const openModal = () => {
		setUser({...selectedUser, password: ""})
		setIsShow(true)
		if (formRef.current) formRef.current.reset()
	}

	const handleSubmit = async (e: FormEvent) => {
		try {
			e.preventDefault()
			const url = `${BASE_API_URL}/user/${selectedUser.id}`
			const {name, email, password, role} = user 
			const payload = new FormData()
			payload.append("name", name || "")
			payload.append("email", email !== undefined ? email.toString() : "0")
			payload.append("password", password || String(selectedUser.password))
			payload.append("role", role || "")
			if(file !== null) payload.append("picture", file)
			const { data } = await put(url, payload, TOKEN)

			if (data?.status) {
				console.log("here")
				setIsShow(false)
				toast(data?.message, {hideProgressBar: false, containerId: `toastuser`, type: `success`})
				setUser({...selectedUser, password: ""})
				setTimeout(() => router.refresh(), 100)
			} else {
				console.log("here 1")
				console.log(file)
				toast(data?.message, {hideProgressBar: false, containerId: `toastuser`, type: `warning`})
			}
		} catch (error) { 
			console.log("here 2")
			console.log(error)
			toast(`Something Wrong`, { hideProgressBar: false, containerId: `toastuser`, type: `error`})
		}
	   
	}

	return (
		<div>
			<ToastContainer containerId={`toastuser`} />
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
							<strong className="font-bold text-2xl">Update user</strong>
							<small className="text-slate-400 text-sm">Managers can update both Cashier and Manager roles on this page.</small>
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

				{/* modal body */}
				<div className="p-5">
					<InputGroupComponent id={`name`} type="text" value={user.name}
						onChange={val => setUser({ ...user, name: val })}
						required={false} label="Name" />

					<InputGroupComponent id={`email`} type="email" value={user.email}
						onChange={val => setUser({ ...user, email: val })}
						required={false} label="email" />

					<Select id={`role`} value={user.role} label="role"
						required={false} onChange={val => setUser({ ...user, role: val })}>
						<option value="">--- Select User ---</option>
						<option value="MANAGER">Manager</option>
						<option value="CASHIER">cashier</option>
					</Select>

					<FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
						label="Unggah Foto (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false}/>

					
					{showPasswordField ? (
						<div className="space-y-2">
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password Default
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									value={passwordInput}
									onChange={(e) => setPasswordInput(e.target.value)}
									className="w-full border rounded px-3 py-2 pr-10 bg-white"
									placeholder="Enter new password"
									required={false}
								/>
								<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-2 top-2 text-gray-500"
								>
								{showPassword ? (
									<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19.5c-4.968 0-9-3.582-9-8s4.032-8 9-8a9.977 9.977 0 015.197 1.462M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.758 2.497-2.4 4.637-4.542 5.999M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								)}
								</button>
						</div>

						<ButtonDanger
							type="button"
							onClick={() => {
							setShowPasswordField(false);
							setPasswordInput("");
							setShowPassword(false);
							}}
						>
							Cancel
						</ButtonDanger>
						</div>
					) : (
						<button
						type="button"
						onClick={() => {
							setShowPasswordField(true); 
							setPasswordInput("")
						}}
						className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-semibold"
						>
						Ubah Password Default
						</button>
					)}




				</div>
				{/* end modal body */}

				{/* modal footer */}
				<div className="w-full p-5 flex rounded-b-2xl shadow">
					<div className="flex ml-auto gap-2">
						<ButtonDanger type="button" onClick={() => setIsShow(false)}>
							Cancel
						</ButtonDanger>
						<ButtonPrimary type="submit" onClick = {() => {
							setUser(prev => ({...prev, password: passwordInput}));
							router.refresh()
							}}>
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

export default EditUser



