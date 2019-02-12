import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CONTEXT, store } from "./rematch";
const {dispatch,getState} = store;
function RootComponent() {
  return (
    <BrowserRouter>
      <CONTEXT.Provider value={{ getState , dispatch}}>
        <App />
      </CONTEXT.Provider>
    </BrowserRouter>
  );
}



function render() {
  ReactDOM.render(
    <div>
      <RootComponent />
    </div>,
    document.getElementById("root") as HTMLElement
  );
}
render();
store.subscribe(render)