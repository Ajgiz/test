import React from "react";
import "../../styles/modal.scss";
export const HandleError: React.FC<{ error: string[] }> = ({ error }) => {
  return (
    <div>
      <h2 className="modal__error">{error.find((elem) => elem !== "")}</h2>
    </div>
  );
};
