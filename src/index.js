import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Previewer from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Previewer />
  </StrictMode>,
  rootElement
);
