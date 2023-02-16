var Form1 = () => {
	return (
		<form id="f1">
			<label htmlFor="name">Name: </label>
			<input type="text" id="name" name="name"/>
			<label htmlFor="email">Email: </label>
			<input type="text" id="email" name="email"/>
			<label htmlFor="password">Password: </label>
			<input type="text" id="password" name="password"/>
		</form>
	)
}

export default Form1;