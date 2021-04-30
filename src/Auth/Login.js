import React,{useRef,useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import { useAuth } from '../context/AuthContext'
const Login = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error,setError] = useState('')
	const [loading,setLoading] = useState(false)
	const { login } = useAuth()
	const history = useHistory()
	
	async function handleSubmit(e){
		e.preventDefault()
		try{
			setError('')
			setLoading(true)
			await login(emailRef.current.value,passwordRef.current.value)
			history.push('/')
		}catch{
			setError('Failed to log in')
			setLoading(false)
		}
	}
	
	return (
		<>
			<form className="login-form" onSubmit={handleSubmit}>
				<h1>Sign In</h1>
				<div className="login-field">
					<input 
						type="email"
						required
						placeholder="Email"
						ref = {emailRef}
						className="login-input"
					/>
				</div>
				<div className="login-field">
					<input 
						type="password"
						required
						placeholder="Password"
						ref = {passwordRef}
						className="login-input"
					/>
				</div>
				<button disabled={loading} className="signin-button" type="submit">Sign In</button>
				<div className="test=creds">
					<h3>Test Credentials</h3>
					<h5>Email :</h5>
					<h5>Password : </h5>
				</div>
			</form>
			<div id="signup-link">
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</div>
		</>
	)
}

export default Login
