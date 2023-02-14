import ModifyButtons from './modifyButtons.jsx';

var Word = (props) => {
	var deleteSelf = () => {
		props.deleteWord(props.word.term);
	}

	var editSelf = () => {
		props.editWord(props.word.term);
	}

	return (
	<div className="word">
		<div><b>Term:</b> {props.word.term} <b>Def:</b> {props.word.def}</div>
		<ModifyButtons delete={deleteSelf} edit={editSelf}/>
	</ div>
	)
}

export default Word;