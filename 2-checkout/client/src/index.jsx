import React, {useState} from "react";
import { render } from "react-dom";
import Form1 from './components/form1.jsx';
import Form2 from './components/form2.jsx';
import Form3 from './components/form3.jsx';
import DetailList from './components/detailList.jsx';
import $ from 'jquery';

//--------External functions

//I know this could be shortened but spent to much time already
var validateForm = (id) => {
  var stringFields = ['name', 'city', 'state'];
  var numberFields = ['zipcode', 'phone', 'cardNum', 'expire', 'cvv', 'billZip'];
  var form = document.getElementById(id);
  for (var i = 0; i < form.length; i++) {
    var field = form[i];
    //Validate fields filled
    if (field.value === '' && field.id !== 'address2') {
      return `Incomplete Form missing field: ${field.id}!`
    }

    if (field.value.length > 50) {
      return `${field.id} to long!`;
    }

    if (field.value.length < 3 && field.id !== 'address2' && field.id !== 'state') {
      return `${field.id} to short!`;
    }
    //Validate state
    if (field.id === 'state' && field.value.length < 2) {
      return `${field.id} to short!`;
    }

    //Validate email
    if (field.id === 'email') {
      var atIdx = field.value.indexOf('@');
      var periodIdx = field.value.indexOf('.');
      if ((atIdx === -1 || periodIdx === -1) || (atIdx >= periodIdx -1)) {
        return 'Incorrect Email Syntax'
      }
      if (periodIdx === field.value.length-1) {
        return 'Incorrect Email Syntax'
      }
    }

    //Validate string fields
    if (stringFields.includes(field.id)) {
      if (/\d/.test(field.value)) {
        return `${field.id} must not contain numbers`;
      }
    }

    //Validate number fields
    if (numberFields.includes(field.id)) {
      if (!Number(field.value)) {
        return `${field.id} must not contain characters`;
      }
    }

    //Validate zip
    if (field.id === 'zipcode' || field.id === 'billZip') {
      if (field.value.length !== 5) {
        return 'Incorrect zipcode length';
      }
    }

    //Validate card num
    if (field.id === 'cardNum') {
      if (field.value.length < 13 || field.value.length > 19) {
        return 'Incorrect card# length';
      }
    }
    //Validate expiration
    if (field.id === 'expire') {
      if (field.value.length !== 8) {
        return 'Incorrect expiration length';
      }
    }

    //Validate cvv
    if (field.id === 'cvv' && field.value.length !== 3) {
        return 'Incorrect cvv length';
    }
    //Validate phone
    if (field.id === 'phone') {
      if (field.value.length < 7 || field.value.length > 12) {
        return 'Inccorect phone# length';
      }
    }

    //Validate name
    if (field.id === 'name') {
      var firstLast = field.value.split(' ');
      if (firstLast[1] !== undefined) {
        if ((firstLast[0].length < 3 || firstLast[1].length < 3) || (firstLast[0] > 50 || firstLast[1] > 50)) {
          return 'First or Last name to short or to long';
        }
      }
    }

  }
  return false;
}
//----------------------

var organizeInfo = (id) => {
  var form = document.getElementById(id);
  var formValObj = {};
  for (var i = 0; i < form.length; i++) {
      formValObj[form[i].id] = form[i].value;
  }
  return formValObj;
};

var displayError = (err) => {
  //If client already working on a form
  var errText = err.responseText;
  if (errText === '"2"' || errText === '"3"' || errText === '"checkoutFalse"') {
    var atEnd = errText === '"checkoutFalse"';
    var pageId = Number(JSON.parse(err.responseText));
    render(
      <div>
        <h1>Looks like you've already started the checkout proccess!</h1>
        <button onClick={() => {atEnd ? renderFinalPage() : renderForm(pageId)}}>Return To Prev Point</button>
      </div>,
      document.getElementById("root")
    )
  } else {
    render(
      <div>
        <h1 style={{'color': 'red'}}>{err.responseText}</h1>
        <button onClick={renderHomePage}>Home</button>
      </div>,
      document.getElementById("root")
    )
  }
}

var finalize = () => {
  sendInfo({}, () => {
    renderHomePage();
  }, false, true);
}

var sendInfo = (formValues, cb, allowEdit, checkout) => {
  if (allowEdit) {
    formValues.allowEdit = allowEdit;
  }
  if (checkout) {
    formValues.checkout = true;
  }
  $.ajax({
    type: 'POST',
    url: `/response`,
    contentType: 'application/json',
    data: JSON.stringify(formValues),
    success: cb,
    error: (err) => {displayError(err)}
  });
};

var getInfo = (cb) => {
  $.ajax({
    type: 'GET',
    url: '/response',
    dataType:'json',
    success: (data) => {cb(data)},
    error: (err) => {console.log(err)}
  });
}

var FinalPage = (props) => {
  var edit = (formId) => {
    renderForm(formId, true, true);
  }

  return (
    <div>
    <h3>Purchase Details</h3>
    <DetailList edit={edit} details={props.data}/>
    <div className='buttonContainer'>
      <button onClick={finalize}>Purchase</button>
    </div>
  </div>
  )
}

//Final -----------------
var renderFinalPage = () => {
  getInfo((data) => {
    render(
      <FinalPage data={data}/>
     ,
      document.getElementById("root")
    )
  });
};

//Forms ------------


var FormPage = (form) => {
  const [errorText, setErrorText] = useState('');
  var handleInfo = () => {
    setErrorText('');
    var err = validateForm(`f${form.id}`);
    if (err) {
      setErrorText(err);
     return;
    }
    sendInfo(organizeInfo(`f${form.id}`), () => {
      if (form.id === 3 || form.finalPage) {
        renderFinalPage();
      } else {
        renderForm(form.id+1);
      }
    }, form.allowEdit);
  };

  return (
    <div>
      <h1>Page {form.id} </h1>
      <div className='form'>
        {form.id === 1 ? <Form1 /> : null}
        {form.id === 2 ? <Form2 /> : null}
        {form.id === 3 ? <Form3 /> : null}
      </div>
      <div className='buttonContainer'>
        <button onClick={handleInfo}>{!form.finalPage ? 'Next' : 'Return'}</button>
        {(form.id !== 1 && !form.finalPage) ? <button id="back" onClick={() => {renderForm(form.id - 1, true)}}>Back</button> : null}
      </div>
      <p style={{'color':'red'}}>{errorText}</p>
    </div>
  )
};


var renderForm = (id, allowEdit = false, finalPage = false) => {
  render(
    <FormPage id={id} allowEdit={allowEdit} finalPage={finalPage}/>,
    document.getElementById("root")
  )
};

//Home ----------

var HomePage = () => {
  const [showBlue, setShowBlue] = useState(false);
  return (
    <div>
      <div id="title">Shopping cart</div>
      {!showBlue ? <img src="./imgs/grayCart.png" /> : null}
      {showBlue ? <img src="./imgs/blueCart.png" /> : null}
      <button onMouseEnter={() => {setShowBlue(true)}} onMouseLeave={() => {setShowBlue(false)}} onClick={() => renderForm(1)}>Proceed to checkout</button>
    </div>
  )
}

var renderHomePage = () => {
  render(
    <HomePage />,
    document.getElementById("root")
  );
};
renderHomePage();