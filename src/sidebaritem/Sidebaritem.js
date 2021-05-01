import React from 'react'
import styles from './Styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import { removeHTMLTags } from '../helpers'
const Sidebaritem = ({note,index,selectedNoteIndex,selectNote,deleteNote}) => {
	return (
		<div key={index}>
			<ListItem className="listItem"
				selected={selectedNoteIndex ===index}
				alignItems='flex-start'
			>
				<div className="textSelection" onClick={()=>selectNote(note,index)}>
					<ListItemText
						primary={note.title}
						secondary = {removeHTMLTags(note && `${note.body.substr(0,30)}...`)}
					>

					</ListItemText>
				</div>
				<DeleteIcon onClick={()=>{deleteNote(note)}}></DeleteIcon>

			</ListItem>
		</div>
	)
}

export default Sidebaritem
