import React from 'react'
import {useAuth} from './context/AuthContext'
import firebase, { firestore,auth } from './firebase'

const Home = () => {
	const {currentUser} = useAuth()
	return (
		<div>
			{auth.currentUser.uid}
			Home
		</div>
	)
}

export default Home
