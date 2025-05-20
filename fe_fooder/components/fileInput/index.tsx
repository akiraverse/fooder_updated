"use client"
import React from "react";
import { useState } from "react";
import { AlertWarning } from "../alert";

type Props = {
	disabled?: boolean,
	acceptTypes: string[],
	onChange: (file: File | null) => void,
	className?: string,
	required: boolean,
	id?: string,
	label?: string,
	maxSize?: number
}

const FileInput = (props: Props) => {
	const [message, setMessage] = useState("")
	const limitSize = props.maxSize || 100000
	const acceptTypes = props.acceptTypes.join()
	const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>, callback: (data: File | null) => void): void => {
		const target = event.target;
		const currentFile = target.files?.[0];

		if (!currentFile) {
			setMessage("No file selected");
			callback(null);
			return;
		}

		setMessage("");

		if (!props.acceptTypes.some(type => type === currentFile.type)) {
			target.value = "";
			setMessage(`'${currentFile.type}' is invalid. Allowed: ${acceptTypes}`);
			callback(null);
			return;
		}

		if (currentFile.size > 2 * 1048 * 1048) {
			target.value = "";
			setMessage(`Your file exceeds the size limit of ${limitSize / 1024 / 1024} MB`);
			callback(null);
			return;
		}

		callback(currentFile);
	};


	return (
		<div className="w-full flex flex-col gap-1 my-2">
			<strong className="text-xs font-bold text-slate-500">{props.label}</strong>
			<input type={`file`}
				className={`text-sm w-full rounded-md p-2 bg-slate-50 border border-white focus:border-slate-500 focus:outline-none ${props.className}`}
				disabled={props.disabled}
				required={props.required || false}
				accept={acceptTypes}
				id={props.id}
				onChange={e => handleFileInput(e, props.onChange)} />
			{
				message !== "" ?
					<AlertWarning title="Peringatan">
						{message}
					</AlertWarning> : <></>
			}
		</div>
	)
   
}

export default FileInput
  
