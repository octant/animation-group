import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AnimationGroup from "./components/animation/AnimationGroup";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  addItem = () => {
    if (this.input.value === "") {
      return;
    }
    this.setState(
      prev => ({
        items: [
          {
            name: `${Math.floor(Math.random() * 1000000)}`,
            value: this.input.value
          },
          ...prev.items
        ]
      }),
      () => {
        this.input.value = "";
        this.input.focus();
      }
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input ref={input => (this.input = input)} type="text" />
        <button onClick={this.addItem}>Add</button>
        <div style={{ position: "absolute", overflow: "hidden" }}>
          <AnimationGroup items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default App;