import './App.css';
import React,{useState,useEffect} from 'react'
import firebase from 'firebase/app'
import {firestore} from './firebase'
import Sidebar from './sidebar/Sidebar'
import Editor from './editor/Editor'
function App() {
	const [selectedNoteIndex,setSelectedNoteIndex] = useState(null)
	const [selectedNote,setSelectedNote] = useState(null)
	const [notes,setNotes] = useState([])

	useEffect(()=>{
		firestore.collection('notes')
		.onSnapshot(snap => {
			console.log("span",snap.docs)
			const notes = snap.docs.map(doc=>{
				const data = doc.data();
				console.log("daa",data)
				data['id'] = doc.id;
				return data
			})
			console.log(notes)
			setNotes(notes)

			
			
		})
	},[])

	const selectNote = (note,index) => {
		console.log("app.js",note,index)
		setSelectedNote(note)
		setSelectedNoteIndex(index)
	}

	const deleteNote = () => {

	}

	const newNote = (title) => {
		const note = {
			title:title,
			body:''
		}
		firestore.collection('notes').add({
			title:note.title,
			body:note.body,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
	}

	const handleCreateNotebook = () => {

	}

	const noteUpdate = (id,noteObj) => {
		console.log(id,noteObj);
		if(id !==''){
			firestore.collection('notes').doc(id).update({
				title:noteObj.title,
				body:noteObj.body,
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
			})
		}
		
	}

	return (
		<div>
			<button onClick={handleCreateNotebook}>CreateNotebook</button>
			<Sidebar selectedNoteIndex={selectedNoteIndex} notes={notes} deleteNote={deleteNote} selectNote={selectNote} newNote={newNote} />
			{selectedNote ?
			<Editor selectedNote={selectedNote} selectedNoteIndex={selectedNoteIndex} notes={notes} noteUpdate={noteUpdate} /> : null
		}
			

		</div>
	);
}

export default App;
