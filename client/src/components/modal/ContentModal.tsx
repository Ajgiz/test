import { TextField } from "@mui/material";
import React from "react";
import { TypeModal } from "../../App";
import "../../styles/modal.scss";
import { IContact } from "../../types/contact";
import { ContentModalProps } from "../../types/modal";

export const ContentModal: React.FC<ContentModalProps> = ({
  name,
  phone,
  setName,
  setPhone,
  typeMod,
  errorValidate,
}) => {
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <>
      {typeMod === TypeModal.add || typeMod === TypeModal.update ? (
        <div className="modal__form">
          <TextField
            error={!!errorValidate}
            value={name}
            onChange={handleChangeName}
            margin="normal"
            fullWidth
            required
            label={typeMod !== TypeModal.update ? "Имя" : ""}
          />
          <TextField
            value={phone}
            onChange={handleChangePhone}
            fullWidth
            error={!!errorValidate}
            type="tel"
            required
            label={typeMod !== TypeModal.update ? "Телефон" : ""}
          />
        </div>
      ) : (
        <div className="modal__confirm">
          Вы действительно хотите удалить этот пост?
        </div>
      )}
    </>
  );
};
