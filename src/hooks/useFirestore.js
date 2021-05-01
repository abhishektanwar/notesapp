import {useEffect,useState} from 'react'
import {firestore} from '../firebase'

const useFirestore = (collection) => {
	const [allNotes,setAllNotes] = useState([])

	useEffect(()=>{
		let unsub = firestore.collection(collection).orderBy("createdAt","desc")
			.onSnapshot((snap)=>{
				let documents = []
				snap.forEach((doc)=>{
					documents.push({
						...doc.data(),
						id:doc.id,
					})
				})
				setAllNotes(documents)
			})
			return () => unsub()
	},[collection])
	return {allNotes}
}

export default useFirestore;