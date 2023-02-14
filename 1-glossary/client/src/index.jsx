import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import WordList from './components/wordList.jsx';
import AddForm from './components/addForm.jsx';
import $ from 'jquery';

var App = () => {
	const [formVisible, setFormVisible] = useState(false);
	const [wordList, setWordList] = useState([]);

	//On startup
	useEffect(() => {
		fetch();
	}, [])

	const update = (data) => {
		setWordList(data);
	}

	const fetch = () => {
		$.ajax({
			type: 'GET',
			url: '/words',
			dataType: 'json',
			success: (data) => {update(data)},
			error: (err) => {console.log(err)}
		});
	};

	const deleteWord = (term) => {
		$.ajax({
			type: 'DELETE',
			url: '/words',
			contentType: 'application/json',
			data: JSON.stringify({term}),
			success: () => {console.log('Removed'); fetch()},
			error: (err) => {console.log(err)}
		});
	}

	const editWord = (term, newDef) => {
		$.ajax({
			type: 'PUT',
			url: '/words',
			contentType: 'application/json',
			data: JSON.stringify({term, newDef}),
			success: () => {console.log('Modified'); fetch()},
			error: (err) => {console.log(err)}
		});
	};

	const addWord = (term, def) => {
		setFormVisible(false);
		if (term === '' && def === '') {
			return;
		}
		$.ajax({
			type: 'POST',
			url: '/words',
			contentType: 'application/json',
			data: JSON.stringify({term, def}),
			success: () => {console.log('success!'); fetch()},
			error: (err) => {console.log(err)}
		});
	};

	return (
		<div>
			<h1>Glossary</h1>
			<button onClick={() => {setFormVisible(true)}} id='add-button'>Add</button>
			{formVisible ? <AddForm addWord={addWord}/> : null}
			<WordList deleteWord={deleteWord} editWord={editWord} words={wordList}/>
		</div>
	)
}

ReactDOM.render(< App/>, document.getElementById('root'))

