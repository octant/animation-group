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

  addItem = e => {
    e.preventDefault();

    if (this.input.value === "") {
      return;
    }
    this.setState(
      prev => ({
        items: [
          {
            name: `${Math.floor(Math.random() * 1000000)}`,
            value: <p>{this.input.value}</p>
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

  removeItem = index => {
    this.setState(prev => ({
      items: prev.items.filter((item, i) => i !== index)
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.addItem}>
          <input ref={input => (this.input = input)} type="text" />
          <button>Add</button>
        </form>
        <div style={{ position: "absolute", width: "100%" }}>
          <AnimationGroup
            items={this.state.items}
            removeMethod={this.removeItem}
          />
        </div>
      </div>
    );
  }
}

export default App;
