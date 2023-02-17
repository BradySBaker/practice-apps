var DetailList = (props) => {
	return (
		<ul className='list'>
			<li>Name: {props.details.name}</li>
			<li>Email: {props.details.email}</li>
			<li>Password: {props.details.password}</li>
			<button onClick={() => props.edit(1)}>Edit</button>
			<li>Address: {props.details.address1}</li>
			<li>Address Line 2: {props.details.address2}</li>
			<li>City: {props.details.city}</li>
			<li>State: {props.details.state}</li>
			<li>Zipcode: {props.details.zipcode}</li>
			<li>Phone Number: {props.details.phone}</li>
			<button onClick={() => props.edit(2)}>Edit</button>
			<li>Card#: {props.details.cardNum}</li>
			<li>Expiration: {props.details.expire}</li>
			<li>CVV: {props.details.cvv}</li>
			<li>Billing Zipcode: {props.details.billZip}</li>
			<button onClick={() => props.edit(3)}>Edit</button>
		</ul>
	)
};

export default DetailList;