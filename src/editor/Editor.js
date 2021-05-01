import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helpers'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import {withStyles} from '@material-ui/core/styles'
import BorderColor from '@material-ui/icons/BorderColor'
import {firestore} from '../firebase'
import { useAuth } from '../context/AuthContext'
import useDebounce from '../helpers'
import firebase from 'firebase/app'
import './Styles.css'
// import styles from './Styles'

const Editor = ({selectedNote,selectedNoteIndex,notes,noteUpdate}) => {
	const [text,setText] = useState(selectedNote.body)
	const [title,setTitle] = useState(selectedNote.title)
	const {currentUser} = useAuth()
	// useEffect(()=>{
	// 	console.log(selectedNote)
	// },[selectedNote])
	// // old code
	// useEffect(()=>{
	// 	setText(selectedNote.body)
	// 	setTitle(selectedNote.title)
	// 	setId(selectedNote.id)
	// },[selectedNote])
	// const updateBody = (val) =>{
	// 	// console.log(val)
	// 	setText(val)
	// 	console.log("text from updateBody",text)
	// 	// update()
	// }

	// const update = debounce(()=>{
	// 	console.log("updating db")
	// 	// noteUpdate(id,{
	// 	// 	title:title,
	// 	// 	body:text
	// 	// })
	// },1500)



	// useEffect(() => {
	// 	console.log(text)
		
	// }, [text])

	// new code
	const updateBodyDebounce = useDebounce(text, 1500);
	const updateTitleDebounce = useDebounce(title, 1500);
	useEffect(()=>{
		setTitle(selectedNote.title)
		setText(selectedNote.body)
	},[selectedNote])

	useEffect(() => {
		if (updateBodyDebounce) {
		  firestore
			.collection(`users/${currentUser.uid}/notes`)
			.doc(selectedNote.id)
			.update({
			  body: text,
			  updatedAt:firebase.firestore.FieldValue.serverTimestamp()
			});
		}
	  }, [updateBodyDebounce]);
	
	  useEffect(() => {
		firestore
		  .collection(`users/${currentUser.uid}/notes`)
		  .doc(selectedNote.id)
		  .update({
			title: title,
		  });
	  }, [updateTitleDebounce]);

	
	  const updateNote = (text) => {
		setText(text);
		console.log(text)
	  };
	  const updateTitle = (e) => {
		setTitle(e.target.value);
		console.log(title)
	  };



	return (
		// <div className="editorContainer"> 
		// 	{/* text editor provided by the react-quill library  */}
		// 	<ReactQuill value={text} onChange={updateBody}></ReactQuill>
		// </div>
		<div className="editorContainer">
			<div className="editorHeader">
				<BorderColorIcon classname="editIcon" />
				<input 
					className="titleInput"
					type="text"
					value={title}
					placeholder="Title of Note"
					onChange={updateTitle}
				/>
			</div>
			<ReactQuill
				id="quill"
				onChange={updateNote}
				value={text}
			>

			</ReactQuill>
		</div>
	)
}

export default Editor