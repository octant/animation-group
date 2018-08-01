import React, { Component } from "react";
import AnimatedItem from "./AnimatedItem";

class AnimationGroup extends Component {
  constructor(props) {
    super(props);

    this.state = { changing: {}, height: 0 };
  }

  handleChange = (height, width, index, remove = false) => {
    this.setState(
      prev => ({
        changing: {
          index,
          height,
          width,
          remove
        },
        height: remove ? prev.height - height : prev.height + height
      }),
      () => {
        if (remove) {
          this.props.removeMethod(index);
        }
        setTimeout(() => {
          this.setState(() => ({ changing: {} }));
        }, 20);
      }
    );
  };

  dynamicProps = index => {
    if (this.state.changing.remove) {
      if (
        Object.keys(this.state.changing).length > 0 &&
        this.state.changing.index <= index
      ) {
        return { top: this.state.changing.height, properties: "right" };
      } else {
        return { top: 0, properties: "top, right" };
      }
    } else {
      if (
        Object.keys(this.state.changing).length > 0 &&
        this.state.changing.index < index
      ) {
        return { top: -this.state.changing.height, properties: "right" };
      } else {
        return { top: 0, properties: "top, right" };
      }
    }
  };

  render() {
    return (
      <div
        ref={element => (this.container = element)}
        style={{
          overflow: "hidden",
          height: this.state.height,
          transitionProperty: "height",
          transitionDuration: "100ms",
          transitionTimingFunction: "ease-in-out",
          transitionDelay: "200ms"
        }}
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
