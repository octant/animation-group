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

  dynamicProps = index => {
    if (
      Object.keys(this.state.changing).length > 0 &&
      this.state.changing.index !== index
    ) {
      return { top: -this.state.changing.height, properties: "right" };
    } else {
      return { top: 0, properties: "top, right" };
    }
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
              {...this.dynamicProps(i)}
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
