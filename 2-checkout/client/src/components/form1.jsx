var Form1 = () => {
	return (
		<form id="f1">
			<label htmlFor="name">
				Name:
				<input type="text" id="name" name="name"/>
			</label>

			<label htmlFor="email">
				Email:
				<input type="text" id="email" name="email"/>
			</label>
			<label htmlFor="password">
				Password:
				<input type="text" id="password" name="password"/>
			</label>
		</form>
	)
}

export default Form1;