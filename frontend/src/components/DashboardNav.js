import { Link } from 'react-router-dom'

const DashboardNav = () => {
	const active = window.location.pathname

	return (
		<ul className='nav nav-tabs'>
			<li className='nav-item'>
				<Link className={`nav-link ${active === '/user/dashboard' && 'active'}`} to='/user/dashboard'>
					Your Bookings
				</Link>
			</li>

			<li className='nav-item'>
				<Link className={`nav-link ${active === '/user/dashboard/seller' && 'active'}`} to='/user/dashboard/seller'>
					Your Hotels
				</Link>
			</li>

			<li className='nav-item'>
				<Link className={`nav-link ${active === '/user/dashboard/profile' && 'active'}`} to='/user/dashboard/profile'>
					Your Profile
				</Link>
			</li>
		</ul>
	)
}

export default DashboardNav
