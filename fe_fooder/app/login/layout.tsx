export const metadata = {
	title: 'Login | Fooder',
	description: 'Praktikum SMK Telkom Malang',
}

type PropsLayout = {
	children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
	return (
		<div className="">
			{children}
		</div>
	)
}

export default RootLayout
  