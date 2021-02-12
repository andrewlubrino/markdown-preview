import "./styles.css";
import React from "react";
import marked from "marked";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";

class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: "",
      on: false,
      element: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMaximize = this.handleMaximize.bind(this);
  }

  handleChange = (event) => {
    let clean = DOMPurify.sanitize(marked(event.target.value));
    this.setState({
      input: clean,
      output: event.target.value,
      on: this.state.on,
      element: this.state.element
    });
  };

  handleMaximize = (name) => {
    this.setState({
      input: this.state.input,
      output: this.state.output,
      on: !this.state.on,
      element: name
    });
  };

  render() {
    const html = this.state.input;
    const onOff = this.state.on;
    const which = this.state.element;

    if (onOff) {
      if (which === "Editor") {
        return (
          <div className="container-style">
            <div className="element-style" Style={"width: 94%;"}>
              <NavBar
                Expand={true}
                Name="Editor"
                callBack={this.handleMaximize}
              />
              <textarea
                value={this.state.output}
                className="text-area"
                onChange={this.handleChange}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="container-style">
            <div className="element-style" Style={"width: 94%;"}>
              <NavBar
                Expand={true}
                Name="Preview"
                callBack={this.handleMaximize}
              />
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="container-style">
          <div className="element-style">
            <NavBar
              Expand={false}
              Name="Editor"
              callBack={this.handleMaximize}
            />
            <textarea
              value={this.state.output}
              className="text-area"
              onChange={this.handleChange}
            />
          </div>
          <div className="element-style">
            <NavBar
              Expand={false}
              Name="Preview"
              callBack={this.handleMaximize}
            />
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      );
    }
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onTrigger = this.onTrigger.bind(this);
  }

  onTrigger = () => {
    this.props.callBack(this.props.Name);
  };

  render() {
    let Icon = (
      <span onClick={this.onTrigger} className="button-style">
        <FontAwesomeIcon className="item-b" icon={faExpandArrowsAlt} />
      </span>
    );

    let maxi = this.props.Expand;
    if (maxi) {
      Icon = (
        <span onClick={this.onTrigger} className="button-style">
          <FontAwesomeIcon className="item-b" icon={faCompressAlt} />
        </span>
      );
    }
    return (
      <div className="nav-bar">
        <p className="item-a">{this.props.Name}</p>
        {Icon}
      </div>
    );
  }
}

export default Previewer;
