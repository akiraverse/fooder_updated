import { ReactNode } from "react"

type Prop = {
	children: ReactNode
	title: string
}

export const AlertInfo = ({ children, title }: Prop) => {
	return (
	    <div className="my-2 bg-sky-200 rounded-md text-sky-800 px-4 py-3 shadow-md border-l-4 border-sky-800" role="alert">
		   <div className="flex gap-1">
			  <div>
				 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
					<path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
				 </svg>
			  </div>
			  <div>
				 <p className="font-bold text-lg">{title}</p>
  
				 <div className="text-sm">
					{children}
				 </div>
			  </div>
		   </div>
  
	    </div>
  
	)
}

export const AlertSucces = ({ children, title }: Prop) => {
	return (
	    <div className="my-2 bg-lime-100 rounded-md text-lime-600 px-4 py-3 shadow-md border-l-4 border-lime-600" role="alert">
		   <div className="flex gap-1">
			  <div>
				 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
					<path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
				 </svg>
			  </div>
			  <div>
				 <p className="font-bold text-lg">{title}</p>
  
				 <div className="text-sm">
					{children}
				 </div>
			  </div>
		   </div>
  
	    </div>
  
	)
}

export const AlertWarning = ({ children, title }: Prop) => {
	return (
	    <div className="my-2 bg-yellow-100 rounded-md text-yellow-600 px-4 py-3 shadow-md border-l-4 border-yellow-600" role="alert">
		   <div className="flex gap-1">
			  <div>
				 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
					<path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
				 </svg>
			  </div>
			  <div>
				 <p className="font-bold text-lg">{title}</p>
  
				 <div className="text-sm">
					{children}
				 </div>
			  </div>
		   </div>
  
	    </div>
  
	)
}

export const AlertDanger = ({ children, title }: Prop) => {
	return (
	    <div className="my-2 bg-red-100 rounded-md text-red-600 px-4 py-3 shadow-md border-l-4 border-red-600" role="alert">
		   <div className="flex gap-1">
			  <div>
				 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
					<path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
				 </svg>
			  </div>
			  <div>
				 <p className="font-bold text-lg">{title}</p>
  
				 <div className="text-sm">
					{children}
				 </div>
			  </div>
		   </div>
  
	    </div>
  
	)
}
  
  