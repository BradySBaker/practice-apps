var ModifyButtons = (props) => {
	return (
		<div style={{'color': 'green'}} className="main-buttons" onClick={props.edit}>Edit</div>
		<div style={{'color': 'red'}} className="main-buttons" onClick={props.delete}>Delete</div>
	)
}

export default ModifyButtons;