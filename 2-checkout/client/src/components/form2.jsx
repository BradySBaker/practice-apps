var Form2 = () => {
	return (
		<form id="f2" className='form'>
			<h3>Address</h3>
			<label htmlFor="line1">Line1: </label>
			<input type="text" id="address1" name="line1"/>
			<label htmlFor="line2">Line2: </label>
			<input type="text" id="address2" name="line2"/>
			<label htmlFor="city">City: </label>
			<input type="text" id="city" name="city"/>
			<label htmlFor="state">State: </label>
			<input type="text" id="state" name="state"/>
			<label htmlFor="zip">Zipcode: </label>
			<input type="text" id="zipcode" name="zip"/>
			<label htmlFor="phone">Phone#: </label>
			<input type="text" id="phone" name="phone"/>
		</form>
	)
}

export default Form2;