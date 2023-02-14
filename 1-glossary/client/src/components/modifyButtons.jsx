import {useState} from 'react';
import AddForm from './addForm.jsx';

var ModifyButtons = (props) => {
	const [formVisible, setFormVisible] = useState(false);

	var editSelf = (def) => {
		props.edit(def);
		setFormVisible(false);
	}

	return (
		<div>
			<div style={{'color': 'green'}} className="main-buttons" onClick={ () => {setFormVisible(true)}}>Edit</div>
			{formVisible ? <AddForm editWord={editSelf} /> : null}
			<div style={{'color': 'red'}} className="main-buttons" onClick={props.delete}>Delete</div>
		</div>
	)
}

export default ModifyButtons;