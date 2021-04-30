import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { useAuth } from './context/AuthContext'
// PRIVATE ROUTE IS JUST A WRAPPER AROUND ROUTE
export default function PrivateRoute({component:Component, ...rest}) {
	const {currentUser} = useAuth()
	return (
		<Route
			{...rest}
			render={props => {
				console.log(currentUser)
				return currentUser ? <Component {...props} /> : <Redirect to="/login" />
			}}
		>

		</Route>
	)
}
