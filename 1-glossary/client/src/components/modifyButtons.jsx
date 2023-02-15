var ModifyButtons = (props) => {
	return (
		<div>
			<div style={{'color': 'green'}} className="modify-buttons main-buttons" onClick={props.edit}>Edit</div>
			<div style={{'color': 'red'}} className="modify-buttons, main-buttons" onClick={props.delete}>Delete</div>
		</div>
	)
}

export default ModifyButtons;