import { Alert } from "@mui/material";
import React from "react";
import "../styles/error.scss";
import ErrorIcon from "@mui/icons-material/Error";

export const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="error">
      <ErrorIcon sx={{ color: "white", fontSize: "85px" }} />
      <p className="error__text">{message}</p>
    </div>
  );
};
