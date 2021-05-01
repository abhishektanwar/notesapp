import React,{useState,useEffect} from 'react'
// import styles from './Styles'
import List from '@material-ui/core/List'
import { Divider,Button } from '@material-ui/core'
import Sidebaritem from '../sidebaritem/Sidebaritem'
import { useAuth } from '../context/AuthContext'
import { firestore } from '../firebase'
import firebase from 'firebase/app'
import useFirestore from '../hooks/useFirestore'

const Sidebar = (pr) => {
	const [addingNote,setAddingNote] = useState(false)
	const {notes,selectedNoteIndex,selectedNote,setSelectedNote,setSelectedNoteIndex,setNotes} = pr
	const [title,setTitle] = useState('')
	const {currentUser,logout} = useAuth()
	// getting notes of current` user

	

	// prev code
	// const newNoteBtnClick = () => {
	// 	console.log("new note btn clicked")
	// 	// console.log("b4 state change",addingNote)
	// 	setAddingNote(!addingNote)
	// 	// console.log("after state change",addingNote)
	// }

	// const updateTitle = (text) => {
	// 	// console.log("here it is ",text);
	// 	setTitle(text)
	// }

	// const newNote = () => {
	// 	console.log(addingNote,title)
	// }

	// // const selectNote = (note,index) => {
	// // 	console.log("select not sidebar")
	// // 	selectNote(note,index)
	// // }

	// const deleteNote = (note) => {
	// 	console.log("delete click",note);
	// 	// if(window.comfirm(`Are You sure you want to delete:${note.title}`)){

	// 	// }
	// }

	// prev code

	// new code from here
	async function handleLogout(){
		// setError('')
		try{
			await logout()
			// history.push('/login')
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
	// 	if(selectedNoteIndex === index){
	// 		setSelectedNoteIndex(null)
	// 		setSelectedNote(null)
	// 	}
	// 	else if(index > selectedNoteIndex){
	// 		setSelectedNoteIndex(selectedNoteIndex)
	// 		setSelectedNote(allNotes[selectedNoteIndex])

	// 	}else{
	// 		selectedNoteIndex === 0 ? {
	// 			setSelectedNoteIndex(selectedNoteIndex)
	// 			setSelectedNote(allNotes[selectedNoteIndex])}
	// 	} : {
	// 		allNotes.length > 1 ? {
	// 			setSelectedNoteIndex(selectedNoteIndex-1)
	// 			setSelectedNote(allNotes[selectedNoteIndex-1])
	// 		} : {
	// 			setSelectedNoteIndex(null)
	// 			setSelectedNote(null)
	// 		}
	// 	}
	}

	// deleteNote = async (note) => {
	// 	const noteIndex = this.state.notes.indexOf(note);
	// 	await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
	// 	if(this.state.selectedNoteIndex === noteIndex) {
	// 	  this.setState({ selectedNoteIndex: null, selectedNote: null });
	// 	} else {
	// 	  this.state.notes.length > 1 ?
	// 	  this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
	// 	  this.setState({ selectedNoteIndex: null, selectedNote: null });
	// 	}
	
	// 	firebase
	// 	  .firestore()
	// 	  .collection('notes')
	// 	  .doc(note.id)
	// 	  .delete();
	//   }
	// }
	return (
		<div className="sidebarContainer">
			<Button onClick={createNewNote}
				className="newNoteBtn"
			>{addingNote ? 'Cancel' : 'New Note' }</Button>
			
			{
				addingNote ? 
				<div>
					<form onSubmit={addNewNote}>
						<input 
							type="text" 
							className="newNoteInput"
							placeholder="Enter note title"
							onChange = {updateTitle}/>
						<Button className="newNoteSubmitBtn" type="submit">
							add Note
						</Button>
					</form>
				</div> 
				: null
				
			}
			{/* old code */}
			{/* <List>
				{
					notes.map((note,index)=>{
						return(
							<div key={index}>
								<Sidebaritem note={note} index={index} selectedNoteIndex={selectedNoteIndex} selectNote={selectNote} deleteNote={deleteNote}/>
								<Divider></Divider>
							</div>
						)
					})
				}
			</List> */}

			{/* new Code */}

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
			<Button
				onClick={handleLogout}
			>SignOut</Button>
		</div>
	)
}

export default Sidebar
