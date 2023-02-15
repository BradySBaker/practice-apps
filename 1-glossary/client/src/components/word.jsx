import ModifyButtons from './modifyButtons.jsx';

var Word = (props) => {
	var deleteSelf = () => {
		props.deleteWord(props.word.term);
	}

var editSelf = (def) => {
	props.editWord(props.word.term);
}

	return (
	<div className="word">
		<div><b>{props.word.term}:</b> {props.word.def}</div>
		<ModifyButtons delete={deleteSelf} edit={editSelf}/>
	</ div>
	)
}

export default Word;