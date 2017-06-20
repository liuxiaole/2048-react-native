import React, { Component } from "react";
import { pannable } from "react-native-gesture-recognizers";
import PropTypes from "prop-types";

const Swipeable = (options = { threshold: 2 }) => WrappedComponent => {
  const PannableWrappedComponent = pannable({
    setGestureState: false
  })(WrappedComponent);

  return class Swipable extends Component {
    constructor(props) {
      super(props);
      this.handlePan = this.handlePan.bind(this);
      this.handlePanBegin = this.handlePanBegin.bind(this);
    }

    handlePanBegin({ originX, originY }) {
      this.recognizable = true;
      this.swipeInfo = {
        lastX: originX,
        lastY: originY,
        timestamp: new Date().valueOf()
      };
    }

    handlePan({ changeX, changeY }) {
      if (!this.recognizable) return;

      let { lastX, lastY, timestamp } = this.swipeInfo;
      let now = new Date().valueOf();
      let diffTime = now - timestamp;
      let diffX = changeX - lastX;
      let diffY = changeY - lastY;
      this.swipeInfo = {
        lastX: changeX,
        lastY: changeY,
        timestamp: now
      };

      let velocity = Math.sqrt(diffX * diffX + diffY * diffY) / diffTime;
      if (velocity > options.threshold) {
        let dir = "";
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            dir = "right";
          } else {
            dir = "left";
          }
        } else {
          if (diffY > 0) {
            dir = "down";
          } else {
            dir = "up";
          }
        }
        this.recognizable = false;
        this.props.onSwipe && this.props.onSwipe(dir);
      }
    }

    handlePanEnd() {
      this.swipeInfo = null;
      this.recognizable = true;
    }

    render() {
      return (
        <PannableWrappedComponent
          onPanBegin={this.handlePanBegin}
          onPan={this.handlePan}
          onPanEnd={this.handleBanEnd}
        />
      );
    }
  };
};

export default Swipeable;
