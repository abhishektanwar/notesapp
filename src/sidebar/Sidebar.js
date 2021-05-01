import React,{useState,useEffect} from 'react'
// import styles from './Styles'
import List from '@material-ui/core/List'
import { Divider,Button } from '@material-ui/core'
import Sidebaritem from '../sidebaritem/Sidebaritem'
import { useAuth } from '../context/AuthContext'
import { firestore } from '../firebase'
import firebase from 'firebase/app'
import useFirestore from '../hooks/useFirestore'
import { useHistory } from 'react-router'

const Sidebar = (pr) => {
	const [addingNote,setAddingNote] = useState(false)
	const {notes,selectedNoteIndex,selectedNote,setSelectedNote,setSelectedNoteIndex,setNotes} = pr
	const [title,setTitle] = useState('')
	const {currentUser,logout} = useAuth()
	const history = useHistory()
	async function handleLogout(){
		// setError('')
		try{
			await logout()
			history.push('/')
		}
		catch{
			console.log("logoout error")
			// setError("failed to logout")
		}

	}

	const {allNotes} = useFirestore(
		`users/${currentUser.uid}/notes`
	)

	useEffect(()=>{
		setSelectedNote(allNotes[selectedNoteIndex])
	},[allNotes,selectedNote])

	const createNewNote = () => {
		setAddingNote(!addingNote)
	}

	const addNewNote = (e) =>{
		e.preventDefault()
		if(title === ''){
			alert("Title cannot be empty")
		}else{
			firestore.collection(`users/${currentUser.uid}/notes`).add({
				title:title,
				body:"",
				createdAt:firebase.firestore.FieldValue.serverTimestamp()
			})
			setTitle('')
			setAddingNote(false)
			setSelectedNoteIndex(0)
			setSelectedNote(null)
		}
	}

	const updateTitle = (e) => {
		const text = e.target.value;
		setTitle(text)
	}

	const selectNote = (note,index) =>{
		console.log("in select note",note,index)

		setSelectedNote(note)
		setSelectedNoteIndex(index)
	}

	const deleteNote = (note,index)=>{
		firestore.collection(`users/${currentUser.uid}/notes`)
		.doc(note.id)
		.delete()
	}
	return (
		<div className="sidebarContainer">
			<Button onClick={createNewNote}
				className="newNoteBtn"
			>{addingNote ? 'Cancel' : 'New Note' }</Button>
			
			{
				addingNote ? 
				<div>
					<form onSubmit={addNewNote} className="new-note-title-form">
						<input 
							type="text" 
							className="newNoteInput"
							placeholder="Enter note title"
							onChange = {updateTitle}/>
						<button className="newNoteSubmitBtn" type="submit">
							Add Note
						</button>
					</form>
				</div> 
				: null
				
			}
			

			<List>
				{allNotes && allNotes.map((note,index) => {
					return (
						<div key={index}>
							<Sidebaritem 
								note={note}
								index={index}
								selectNote = {selectNote}
								selectedNoteIndex={selectedNoteIndex}
								deleteNote={deleteNote}
							/>
							<Divider />
						</div>
					)
				})}
			</List>
			<Button className="logoutbutton"
				onClick={handleLogout}
			>SignOut</Button>
		</div>
	)
}

export default Sidebar
