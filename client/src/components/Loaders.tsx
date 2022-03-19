import React from "react";
import "../styles/Loaders.scss";

export const Loaders: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <div className={`lds-ring ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
