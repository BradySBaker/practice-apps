import React, {useState} from "react";
import { render } from "react-dom";
import Form1 from './components/form1.jsx';
import $ from 'jquery';

var F1Page = () => {
  const [errorVisible, setErrorVisible] = useState(false);

  var getInfo = () => {
    setErrorVisible(false);
    var form = document.getElementById('f1');
    var formValObj = {};
    for (var i = 0; i < form.length; i++) {
      if (form[i].value !== '') {
        formValObj[form[i].id] = form[i].value;
      } else {
        setErrorVisible(true);
        return;
      }
    }
    sendInfo(formValObj);
  };

  var sendInfo = (formValues) => {
    $.ajax({
      type: 'POST',
      url: '/f1',
      contentType: 'application/json',
      data: JSON.stringify(formValues),
      success: () => {console.log('success!!')},
      error: (err) => {console.log(err)}
    });
  }

  return (
    <div>
      <h1>F1 Page</h1>
      <Form1 />
      <button onClick={getInfo}>Next</button>
      {errorVisible ? <p>Incomplete Form!</p> : null}
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