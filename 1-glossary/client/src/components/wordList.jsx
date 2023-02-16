import Word from './word.jsx';
import {useState} from 'react';
var WordList = (props) => {
	
	return (
	<div>
		{props.words.map((curWord) => {
			return (
				<Word key={curWord._id} word={curWord} deleteWord={props.deleteWord} editWord={props.allowEdit}/>
			)
		})}
	</div>
	)
}

export default WordList;