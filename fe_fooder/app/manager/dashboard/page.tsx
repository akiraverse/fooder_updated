
import DisplayChart from './charts';
import Welcome from './welcome';

const DashboardPage = () => {

	
	return (
		<div className="w-full h-full bg-white rounded-lg p-3 border-t-4 border-t-primary shadow-md px-10">
			<Welcome />
			<h5 className='text-2xl font-semibold text-center justify-center mx-auto my-5'>Menu 🌮 <span className='font-thin'>|</span> Payment Method 💳 <span className='font-thin'>|</span> Total Spending 💰</h5>
			<DisplayChart />
		</div> 
	)
}
export default DashboardPage
  