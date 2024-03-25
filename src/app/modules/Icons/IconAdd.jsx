import * as React from "react";

function IconAdd(props) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="white"
      height="0.4em"
      width="0.4em"
      {...props}
    >
      <path
        fill="white"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={30}
        d="M256 112v288M400 256H112"
      />
    </svg>
  );
}

export default IconAdd;