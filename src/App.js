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



	const handleCreateNotebook = () => {

	}

	return (
		<div>
			<button onClick={handleCreateNotebook}>CreateNotebook</button>
			<Sidebar selectedNoteIndex={selectedNoteIndex} notes={notes} deleteNote={deleteNote} selectNote={selectNote} newNote={newNote} />
			<Editor />
		</div>
	);
}

export default App;
