import React,{useRef,useState} from 'react'
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"
import { useHistory,Link } from "react-router-dom"

const SignUp = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	const [error,setError] = useState('')
	const [loading,setLoading] = useState(false)
	const {signup} = useAuth()
	const history = useHistory()
	async function handleSignUpSubmit(e){
		e.preventDefault()

		if(passwordRef.current.value !== confirmPasswordRef.current.value){
			return setError("Passwords do no match")
		}

		try{
			setError('')
			setLoading(true)
			await signup(emailRef.current.value,passwordRef.current.value)
			console.log(auth.currentUser.uid)
			history.push('/')
		}
		catch{
			setError('Failed to create an account')
		}
		setLoading(false)
	}
	return (
		
		<>
			<h1>Sign Up</h1>
			<div className="alert">
				{error && <alert className="alert-error">{error}</alert>}
			</div>
			
			<form className="todo-form" onSubmit={handleSignUpSubmit}>
				<div className="signup-field">
				<input
					type="email"
					required
					ref ={emailRef}
					className="signup-input"
					placeholder="Email"
				></input>
				</div>
				<div className="signup-field">
				<input
					type="password"
					required
					ref ={passwordRef}
					className="signup-input"
					placeholder="Password"
				></input>
				</div>
				<div className="signup-field">
				<input
					type="password"
					required
					ref ={confirmPasswordRef}
					className="signup-input"
					placeholder="Confirm Password"
				></input>
				</div>
				
				<button disabled={loading} className="signin-button" type="submit">Sign Up</button>
			</form>
			<div id="signup-link">
				Already have an account?<Link to="/login"> Log In</Link>
			</div>
		</>
	)
}

export default SignUp
