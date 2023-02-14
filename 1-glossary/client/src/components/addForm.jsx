var AddForm = (props) => {
	var add = () => {
		var term = document.getElementById("term-input").value;
		var def = document.getElementById("desc-input").value;
		props.addWord(term, def);
	};

	var edit = () => {
		var def= document.getElementById("desc-input").value;
		props.editWord(def);
	}

	return (
		<form id='add-form'>
			{!props.editWord ? <div>Term</div> : null}
			{!props.editWord ? <input type="text" id="term-input" /> : null}
			<div>Description</div>
			<textarea id="desc-input" rows="3" cols="50"/>
			<div className="main-buttons" onClick={!props.editWord ? add : edit}>Submit</div>
		</form>
	)
}

export default AddForm;