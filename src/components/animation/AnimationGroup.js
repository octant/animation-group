import React, { Component } from "react";
import AnimatedItem from "./AnimatedItem";

class AnimationGroup extends Component {
  constructor(props) {
    super(props);

    this.state = { changing: {} };
  }

  handleChange = (height, width, index, remove = false) => {
    this.setState(
      () => ({
        changing: {
          index,
          height,
          width
        }
      }),
      () => {
        if (remove) {
          this.props.removeMethod(index);
        }
        setTimeout(() => {
          this.setState(() => ({ changing: {} }));
        }, 0);
      }
    );
  };

  render() {
    return (
      <div
        ref={element => (this.container = element)}
        style={{ width: "200px" }}
      >
        {this.props.items.map(({ name, value }, i) => {
          return (
            <AnimatedItem
              top={
                Object.keys(this.state.changing).length > 0 &&
                this.state.changing.index !== i
                  ? -(this.state.changing.height + 16)
                  : 0
              }
              properties={
                Object.keys(this.state.changing).length > 0 &&
                this.state.changing.index !== i
                  ? "right"
                  : "top, right"
              }
              key={name}
              index={i}
              changeMethod={this.handleChange}
            >
              {value}
            </AnimatedItem>
          );
        })}
      </div>
    );
  }
}

export default AnimationGroup;
