var DetailList = (props) => {
	return (
		<ul className='list'>
			<li>Name: {props.details.name}</li>
			<li>Email: {props.details.email}</li>
			<li>Password: {props.details.password}</li>
			<li>Address: {props.details.address1}</li>
			<li>Address Line 2: {props.details.address2}</li>
			<li>City: {props.details.city}</li>
			<li>State: {props.details.state}</li>
			<li>Zipcode: {props.details.zipcode}</li>
			<li>Phone Number: {props.details.phone}</li>
			<li>Card#: {props.details.cardNum}</li>
			<li>Expiration: {props.details.expire}</li>
			<li>CVV: {props.details.cvv}</li>
			<li>Billing Zipcode: {props.details.billZip}</li>
		</ul>
	)
};

export default DetailList;