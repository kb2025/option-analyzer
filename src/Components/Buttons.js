import React, { useState } from "react";
function Button(props) {
  const [size] = useState(props.size);
  const [variant] = useState(props.variant);
  const [padding] = useState(props.padding);
  const [margin] = useState(props.margin);
  return (
    <button className={`btn-${variant} btn-${size} ${margin} ${padding}` }>{props.children}</button>
  );
}
export default Button;
