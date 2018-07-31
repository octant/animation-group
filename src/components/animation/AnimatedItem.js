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
      top: 0,
      right: 0
    };
  }

  componentDidMount() {
    this.setState(
      prev => ({
        transitionProperty: "top",
        transitionDuration: `${this.duration}${this.units}`,
        transitionTimingFunction: this.timingFunction,
        transitionDelay: `${this.delay}${this.units}`,
        top: -this.container.clientHeight,
        right: -this.container.clientWidth
      }),
      () => {
        setTimeout(() => {
          this.setState(prev => ({
            transitionProperty: this.properties,
            top: 0,
            right: 0
          }));
        }, 0);
      }
    );
    this.props.changeMethod(
      this.container.clientHeight,
      this.container.clientWidth,
      this.props.index,
      true
    );
  }

  render() {
    return (
      <div
        style={{ ...this.state }}
        ref={element => (this.container = element)}
      >
        {this.props.children}
      </div>
    );
  }
}
