export const enter = (transition, duration, timingFunction, delay) => {
  return {
    transitionProperty: transition,
    transitionDuration: duration,
    transitionTimingFunction: timingFunction,
    transitionDelay: delay,
    position: "relative",
    top: 0,
    right: 0
  };
};
