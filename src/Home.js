import React,{ useState,useEffect } from 'react'
import {useAuth} from './context/AuthContext'
import firebase from 'firebase/app'

import { firestore,auth } from './firebase'
import { useHistory } from "react-router-dom"
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'
// import './home.css'
import './homecss.css'
const Home = () => {
	const {currentUser,logout} = useAuth()
	const [error,setError] = useState('')
	const [selectedNoteIndex,setSelectedNoteIndex] = useState(null)
	const [selectedNote,setSelectedNote] = useState(null)
	const [notes,setNotes] = useState([])
	// const { logout } = useAuth()
	const history = useHistory()
	
	return (
		<div>

		<div className="app-container" >
			<Sidebar 
				setSelectedNote = {setSelectedNote}
				setSelectedNoteIndex = {setSelectedNoteIndex}
				setNotes = {setNotes}
				notes = {notes}
				selectedNoteIndex = {selectedNoteIndex}
				selectedNote = {selectedNote}
			/>
			{
				selectedNote && <Editor
				setSelectedNote = {setSelectedNote}
				setSelectedNoteIndex = {setSelectedNoteIndex}
				setNotes = {setNotes}
				notes = {notes}
				selectedNoteIndex = {selectedNoteIndex}
				selectedNote = {selectedNote} />
			}

		</div>
		</div>
	)
}

export default Home
