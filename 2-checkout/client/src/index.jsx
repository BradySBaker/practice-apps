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

//F3 ------------------
var F3Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(organizeInfo('f3'), renderFinalPage);
    if (err) {
      setErrorVisible(true);
    }
  };

  return (
    <div>
      <h1>F3 Page</h1>
      <Form3 />
      <button onClick={handleInfo}>Next</button>
      {errorVisible ? <p style={{'color':'red'}}>Incomplete Form!</p> : null}
    </div>
  )
}

var renderF3Page = () => {
  render(
    <F3Page />,
    document.getElementById("root")
  )
};
//F2---------------
var F2Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(organizeInfo('f2'), renderF3Page);
    if (err) {
      setErrorVisible(true);
    }
  };

  return(
    <div>
      <h1>F2 Page</h1>
      <Form2 />
      <button onClick={handleInfo}>Next</button>
      {errorVisible ? <p style={{'color':'red'}}>Incomplete Form!</p> : null}
    </div>
  )
}

var renderF2Page = () => {
  render(
    <F2Page />,
    document.getElementById("root")
  )
};
//F1 -------------
var F1Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(organizeInfo('f1'), renderF2Page);
    if (err) {
      setErrorVisible(true);
    }
  };

  return (
    <div>
      <h1>F1 Page</h1>
      <Form1 />
      <button onClick={handleInfo}>Next</button>
      {errorVisible ? <p style={{'color':'red'}}>Incomplete Form!</p> : null}
    </div>
  )
}

var renderF1Page = () => {
  render(
    <F1Page />,
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