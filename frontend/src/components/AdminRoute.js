import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './HelperFunctions'

const AdminRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() && isAuthenticated().role === 'admin' ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/signin',
						state: { from: props.location }
					}}
				/>
			)}
	/>
)

export default AdminRoute
