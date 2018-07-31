import React, { Component } from "react";
import AnimatedItem from "./AnimatedItem";

class AnimationGroup extends Component {
  handleChange = (height, width, index, direction) => {
    console.log(height, width, index, direction);
  };

  render() {
    return (
      <div
        ref={element => (this.container = element)}
        style={{ width: "200px" }}
      >
        {this.props.items.map(({ name, value }, i) => {
          return (
            <AnimatedItem key={name} index={i} changeMethod={this.handleChange}>
              {value}
            </AnimatedItem>
          );
        })}
      </div>
    );
  }
}

export default AnimationGroup;
