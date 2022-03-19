import { Button } from "@mui/material";
import React from "react";
import { TypeModal } from "../App";
import "../styles/contact-item.scss";
import { IContact } from "../types/contact";

export const ContactItem: React.FC<{
  item: IContact;
  setTypeModal: React.Dispatch<React.SetStateAction<TypeModal | null>>;
  setSelectContact: React.Dispatch<React.SetStateAction<IContact | null>>;
}> = ({ item, setTypeModal, setSelectContact }) => {
  
  const handleOpenModal = (type: TypeModal) => {
    if (type === TypeModal.update) {
      setTypeModal(TypeModal.update);
    } else {
      setTypeModal(TypeModal.remove);
    }
    setSelectContact(item);
  };

  return (
    <div className="contact-item">
      <div className="contact-item__info">
        <p className="contact-item__name">Имя : {item.username}</p>
        <p className="contact-item__phone">
          <span>телефон:</span> {item.phone}
        </p>
      </div>
      <div className="contact-item__action">
        <Button
          onClick={() => handleOpenModal(TypeModal.update)}
          variant="outlined"
        >
          Редактировать
        </Button>
        <Button
          onClick={() => handleOpenModal(TypeModal.remove)}
          variant="outlined"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};
