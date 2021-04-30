import React,{useState} from 'react'
// import styles from './Styles'
import List from '@material-ui/core/List'
import { Divider,Button } from '@material-ui/core'
import Sidebaritem from '../sidebaritem/Sidebaritem'
const Sidebar = (pr) => {
	const [addingNote,setAddingNote] = useState(false)
	const {notes,selectedNoteIndex,selectNote} = pr
	const [title,setTitle] = useState('')
	const newNoteBtnClick = () => {
		console.log("new note btn clicked")
		// console.log("b4 state change",addingNote)
		setAddingNote(!addingNote)
		// console.log("after state change",addingNote)
	}

	const updateTitle = (text) => {
		// console.log("here it is ",text);
		setTitle(text)
	}

	const newNote = () => {
		console.log(addingNote,title)
	}

	// const selectNote = (note,index) => {
	// 	console.log("select not sidebar")
	// 	selectNote(note,index)
	// }

	const deleteNote = (note) => {
		console.log("delete click",note);
		// if(window.comfirm(`Are You sure you want to delete:${note.title}`)){

		// }
	}
	return (
		<div className="sidebarContainer">
			<Button onClick={newNoteBtnClick}
				className="newNoteBtn"
			>{addingNote ? 'Cancel' : 'New Note' }</Button>
			
			{
				addingNote ? 
				<div>
					<input 
						type="text" 
						className="newNoteInput"
						placeholder="Enter note title"
						onKeyUp={(e)=>updateTitle(e.target.value)}/>
					<Button className="newNoteSubmitBtn" onClick={newNote}>
						Submit Note
					</Button>
				</div> 
				: null
				
			}
			<List>
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
			</List>
		</div>
	)
}

export default Sidebar
