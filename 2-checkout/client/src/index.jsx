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
  render(
    <div>
      <h1 style={{'color': 'red'}}>Error: {err.responseText}</h1>
      <button onClick={renderHomePage}>Home</button>
    </div>,
    document.getElementById("root")
  )
}

var sendInfo = (formValues, cb) => {
  if (!formValues) {
    return 'empty field';
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
        <button onClick={renderHomePage}>Purchase</button>
      </div>
     ,
      document.getElementById("root")
    )
  });
};


var renderF3Page = () => {
  render(
    <FormPage id={3} />,
    document.getElementById("root")
  )
};

var renderF2Page = () => {
  render(
    <FormPage id={2} />,
    document.getElementById("root")
  )
};

//F1 -------------
var FormPage = (form) => {
  const [errorVisible, setErrorVisible] = useState(false);
  var functions = [renderF2Page, renderF3Page, renderFinalPage];
  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(organizeInfo(`f${form.id}`), functions[form.id - 1]);
    if (err) {
      setErrorVisible(true);
    }
  };

  return (
    <div>
      <h1>Page {form.id} </h1>
      {form.id === 1 ? <Form1 /> : null}
      {form.id === 2 ? <Form2 /> : null}
      {form.id === 3 ? <Form3 /> : null}
      <button onClick={handleInfo}>Next</button>
      {errorVisible ? <p style={{'color':'red'}}>Incomplete Form!</p> : null}
    </div>
  )
};


var renderF1Page = () => {
  render(
    <FormPage id={1}/>,
    document.getElementById("root")
  )
};

//Home ----------
var renderHomePage = () => {
  render(
    <div>
      <h1>Shopping cart</h1>
      <button onClick={renderF1Page}>Proceed to checkout</button>
    </div>,
    document.getElementById("root")
  );
};
renderHomePage();