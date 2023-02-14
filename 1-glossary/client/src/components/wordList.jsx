import Word from './word.jsx';

var WordList = (props) => {
	console.log(props);
	return (
	<div>
		{props.words.map((curWord) => {
			return (
				<Word key={curWord._id} word={curWord} deleteWord={props.deleteWord} editWord={props.editWord}/>
			)
		})}
	</div>
	)
}

export default WordList;