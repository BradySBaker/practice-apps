var Form3 = () => {
	return (
		<form id="f3">
			<label htmlFor="cardNum">
				Card#:
				<input type="text" id="cardNum" name="cardNum"/>
			</label>
			<label htmlFor="expire">
				Expiration:
				<input type="text" id="expire" name="expire"/>
			</label>
			<label htmlFor="cvv">
				CVV:
				<input type="text" id="cvv" name="cvv"/>
			</label>
			<label htmlFor="billZip">
				Billing Zipcode:
				<input type="text" id="billZip" name="billZip"/>
			</label>
		</form>
	)
}

export default Form3;