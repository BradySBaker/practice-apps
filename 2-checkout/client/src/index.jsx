import React, {useState} from "react";
import { render } from "react-dom";
import Form1 from './components/form1.jsx';
import Form2 from './components/form2.jsx';
import Form3 from './components/form3.jsx';
import DetailList from './components/detailList.jsx';
import $ from 'jquery';

//--------External functions
var organizeInfo = (id) => {
  var form = document.getElementById(id);
  var formValObj = {};
  for (var i = 0; i < form.length; i++) {
    if (form[i].value !== '' || form[i].id === 'address2') {
      formValObj[form[i].id] = form[i].value;
    } else {
      return;
    }
  }
  return formValObj;
};

var displayError = (err) => {
  //If client already working on a form
  if (err.responseText === '"2"' || err.responseText === '"3"') {
    var pageId = Number(JSON.parse(err.responseText));
    render(
      <div>
        <h1>Looks like you've already started the checkout proccess!</h1>
        <button onClick={() => {renderForm(pageId)}}>Return To Prev Form</button>
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

var sendInfo = (formValues, cb, allowEdit) => {
  if (!formValues) {
    return 'empty field';
  }
  if (allowEdit) {
    formValues.allowEdit = allowEdit;
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

//Final -----------------
var renderFinalPage = () => {
  getInfo((data) => {
    console.log(data);
    render(
      <div>
        <h3>Purchase Details</h3>
        <DetailList details={data}/>
        <div className='buttonContainer'>
          <button onClick={renderHomePage}>Purchase</button>
          <button id="back" onClick={() => {renderForm(3)}}>Back</button>
        </div>
      </div>
     ,
      document.getElementById("root")
    )
  });
};

//Forms ------------


var FormPage = (form, allowEdit) => {
  const [errorVisible, setErrorVisible] = useState(false);
  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(organizeInfo(`f${form.id}`), () => {
      if (form.id === 3) {
        renderFinalPage();
      } else {
        renderForm(form.id+1);
      }
    }, form.allowEdit);
    if (err) {
      setErrorVisible(true);
    }
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
        <button onClick={handleInfo}>Next</button>
        {form.id !== 1 ? <button id="back" onClick={() => {renderForm(form.id - 1, true)}}>Back</button> : null}
      </div>
      {errorVisible ? <p style={{'color':'red'}}>Incomplete Form!</p> : null}
    </div>
  )
};


var renderForm = (id, allowEdit = false) => {
  render(
    <FormPage id={id} allowEdit={allowEdit}/>,
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