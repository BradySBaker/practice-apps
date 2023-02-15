import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import WordList from './components/wordList.jsx';
import AddForm from './components/addForm.jsx';
import $ from 'jquery';
import handleSearch from './helpers/handleSearch.js';


var App = () => {
	const [editFormVisible, setEditFormVisible] = useState(false);
	const [addFormVisible, setAddFormVisible] = useState(false);
	const [editableTerm, setEditableTerm] = useState(null);
	const [wordList, setWordList] = useState([]);
	const [originWordList, setOriginWordList] = useState([]);

	//On startup
	useEffect(() => {
		fetch();
	}, [])

	const update = (data) => {
		setWordList(data);
		setOriginWordList(data);
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
		setEditFormVisible(false);
		$.ajax({
			type: 'DELETE',
			url: '/words',
			contentType: 'application/json',
			data: JSON.stringify({term}),
			success: () => {console.log('Removed'); fetch()},
			error: (err) => {console.log(err)}
		});
	}

	const allowEditableTerm = (term) => {
		setEditFormVisible(true);
		setAddFormVisible(false);
		setEditableTerm(term);
	}

	const editWord = (newDef) => {
		var term = editableTerm;
		setEditFormVisible(false);
		if (newDef === '') {
			return;
		}
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
		setAddFormVisible(false);
		if (term === '' || def === '') {
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
			<h1 id="title">Glossary</h1>
			<input id='search' type="text" placeholder='search...' onChange={() => setWordList(handleSearch(originWordList))}/>
			<button onClick={() => {!editFormVisible ? setAddFormVisible(true) : null}} className='main-buttons' id='add-button'>Add Word</button>
			{addFormVisible ? <AddForm addWord={addWord}/> : null}
			{editFormVisible ? <AddForm editWord={editWord}/> : null}
			<WordList deleteWord={deleteWord} allowEdit={allowEditableTerm} words={wordList}/>
		</div>
	)
}

ReactDOM.render(< App/>, document.getElementById('root'))

