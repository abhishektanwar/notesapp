import React,{useRef,useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import { useAuth } from '../context/AuthContext'
import './loginsignup.css'
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
			<div className="app-title-container">
				<h1 className="app-title">Gummed Notes</h1>
				<p>Your go to notes taking app</p>
			</div>
			
		<div className="login-form-container">
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
				<div className="test-creds">
					<h3 style={{paddingBottom:"10px"}}>Test Credentials</h3>
					<h5>Email : a@a.com</h5>
					<h5>Password : 123456</h5>
				</div>
			</form>
			<div id="signup-link">
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</div>
		</div>
			
		</>
	)
}

export default Login
