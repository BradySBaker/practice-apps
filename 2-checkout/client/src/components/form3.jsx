var Form3 = () => {
	return (
		<form id="f3" className='form'>
			<label htmlFor="cardNum">Card#: </label>
			<input type="text" id="cardNum" name="cardNum"/>
			<label htmlFor="expire">Expiration: </label>
			<input type="text" id="expire" name="expire"/>
			<label htmlFor="cvv">CVV: </label>
			<input type="text" id="cvv" name="cvv"/>
			<label htmlFor="billZip">Billing Zipcode: </label>
			<input type="text" id="billZip" name="billZip"/>
		</form>
	)
}

export default Form3;