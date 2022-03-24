import React, { useEffect, useState } from "react";
import "./Footer.scss";

// Function Component

const Clock = (props) => {
  const [date, setDate] = useState(new Date());
  const [opacity, setOpacity] = useState("1");
  const [show, setShow] = useState("visible");

  function tick() {
    setDate(new Date());
  }

  function handleShow() {
    if (show === "hidden") {
      setShow("visible");
      setOpacity("1");
    } else {
      setShow("hidden");
      setOpacity("0");
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleShow();
    }, 1000);
  }, [show]);

  return (
    <div>
      <h2 style={{ visibility: show, opacity: opacity }}>
        It is {date.toLocaleTimeString()}. + {props.children}
      </h2>
    </div>
  );
};

// Class Component
class ClockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  // work after the component Removed
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
export default Clock;
