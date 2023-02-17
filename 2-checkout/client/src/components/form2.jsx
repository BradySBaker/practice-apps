var Form2 = () => {
	return (
		<form id="f2">
			<label htmlFor="line1">
				<b>Address</b>:
				<input type="text" id="address1" name="line1"/>
			</label>
			<label htmlFor="line2">
				Line2:
				<input type="text" id="address2" name="line2"/>
			</label>
			<label htmlFor="city">
				City:
				<input type="text" id="city" name="city"/>
			</label>
			<label htmlFor="state">
				State:
				<input type="text" id="state" name="state"/>
			</label>
			<label htmlFor="zip">
				Zipcode:
				<input type="text" id="zipcode" name="zip"/>
			</label>
			<label htmlFor="phone">
				Phone#:
				<input type="text" id="phone" name="phone"/>
			</label>
		</form>
	)
}

export default Form2;