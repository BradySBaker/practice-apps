var AddForm = (props) => {

	var add = () => {
		var term = document.getElementById("term-input").value;
		var desc = document.getElementById("desc-input").value;
		props.addWord(term, desc);
	}

	return (
		<form id='add-form'>
			<div>Term</div>
			<input type="text" id="term-input" />
			<div>Description</div>
			<textarea id="desc-input" rows="3" cols="50"/>
			<div className="main-buttons" onClick={add}>Submit</div>
		</form>
	)
}

export default AddForm;