import React, {useState} from "react";
import { render } from "react-dom";
import Form1 from './components/form1.jsx';
import Form2 from './components/form2.jsx';
import Form3 from './components/form3.jsx';
import $ from 'jquery';


var getInfo = (id) => {
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
    error: (err) => {console.log('err => ', err)}
  });
};

var renderFinalPage = () => {
  render(
    <h1>PURCHASE COMPLETE!</h1>,
    document.getElementById("root")
  )
};

var F3Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(getInfo('f3'), renderFinalPage);
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

var F2Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(getInfo('f2'), renderF3Page);
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

var F1Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var handleInfo = () => {
    setErrorVisible(false);
    var err = sendInfo(getInfo('f1'), renderF2Page);
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

var renderHomePage = () => {
  render(
    <div>
      <h1>Shopping cart</h1>
      <p>
        <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
      </p>
      <button onClick={renderF1Page}>Proceed to checkout</button>
    </div>,
    document.getElementById("root")
  );
};
renderHomePage();