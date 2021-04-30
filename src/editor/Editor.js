import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helpers'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import {withStyles} from '@material-ui/core/styles'
// import styles from './Styles'

const Editor = ({selectedNote,selectedNoteIndex,notes,noteUpdate}) => {
	const [text,setText] = useState('')
	const [title,setTitle] = useState('')
	const [id,setId] = useState('')

	useEffect(()=>{
		setText(selectedNote.body)
		setTitle(selectedNote.title)
		setId(selectedNote.id)
	},[selectedNote])
	const updateBody = (val) =>{
		// console.log(val)
		setText(val)
		console.log("text from updateBody",text)
		update()
	}

	const update = debounce(()=>{
		console.log("updating db")
		noteUpdate(id,{
			title:title,
			body:text
		})
	},1500)


	// useEffect(() => {
	// 	console.log(text)
		
	// }, [text])

	return (
		<div className="editorContainer"> 
			{/* text editor provided by the react-quill library  */}
			<ReactQuill value={text} onChange={updateBody}></ReactQuill>
		</div>
	)
}

export default Editor