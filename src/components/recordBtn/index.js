import React, { useState } from "react";
import { Button } from "antd";
import "./index.css";

export default (props) => {
  const [show, setShow] = useState(false);

  const handleRecord = () => {
    if (show) {
      return;
    }
    setShow(true);
    props.startRecord();
  };

  const handleEndRecord = () => {
    setShow(false);
    props.endRecord();
  };

  return (
    <div>
      <Button type="primary" onClick={handleRecord} danger={show}>
      Start recording
      </Button>
      <span className="bling">
        {show ? <span className="bling-in" /> : null}
      </span>
      <Button type="dashed" onClick={handleEndRecord}>
        end
      </Button>
    </div>
  );
};
