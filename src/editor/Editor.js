import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import debounce from '../helpers'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import {withStyles} from '@material-ui/core/styles'
// import styles from './Styles'

const Editor = () => {
	const [text,setText] = useState('')
	const [title,setTitle] = useState('')
	const [id,setId] = useState('')

	const updateBody = async(val) =>{
		// console.log(val)
		await setText(val)
		update()
	}

	const update = debounce(()=>{
		console.log("updating db")
	},1500)

	useEffect(() => {
		console.log(text)
		
	}, [text])

	return (
		<div className="editorContainer"> 
			{/* text editor provided by the react-quill library  */}
			<ReactQuill value={text} onChange={updateBody}></ReactQuill>
		</div>
	)
}

export default Editor