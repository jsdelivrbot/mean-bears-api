"use strict";

var render = () => {
  document.getElementById("js").innerHTML = `<div class="demo">Hello JS<input /><p>${new Date()}</p></div>`;

  ReactDOM.render(
    React.createElement("div",null,"Hello React ",
        React.createElement("input"),
            React.createElement("p",null,new Date().toString())
    ),
    document.getElementById("root")
  );
}
setInterval(render, 1000);
