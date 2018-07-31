import React, { Component } from "react";

export default class AnimatedItem extends Component {
  constructor(props) {
    super(props);
    this.duration = 100;
    this.delay = 200;
    this.units = "ms";
    this.properties = "top, right";
    this.timingFunction = "ease-in-out";

    this.state = {
      transitionProperty: this.properties,
      transitionDuration: `${this.duration}${this.units}`,
      transitionTimingFunction: this.timingFunction,
      transitionDelay: `${this.delay}${this.units}`,
      position: "relative",
      margin: 0
    };
  }

  componentDidMount() {
    this.setState(
      () => ({
        right: -this.container.clientWidth
      }),
      () => {
        setTimeout(() => {
          this.setState(prev => ({
            right: 0
          }));
        }, this.duration + this.delay);
      }
    );
    this.props.changeMethod(
      this.container.clientHeight,
      this.container.clientWidth,
      this.props.index
    );
  }

  handleRemove = () => {
    this.setState(
      () => ({
        right: -this.container.clientWidth
      }),
      () => {
        setTimeout(
          () =>
            this.props.changeMethod(
              this.container.clientHeight,
              this.container.clientWidth,
              this.props.index,
              true
            ),
          this.delay + this.duration
        );
      }
    );
  };

  render() {
    return (
      <div
        id={this.props.index}
        style={{
          ...this.state,
          top: this.props.top || 0,
          transitionProperty: this.props.properties || this.properties,
          margin: 0
        }}
        ref={element => (this.container = element)}
      >
        <div id="content">{this.props.children}</div>
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <span style={{ cursor: "pointer" }} onClick={this.handleRemove}>
            x
          </span>
        </div>
      </div>
    );
  }
}
