import React from "react";
import "../../styles/modal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { ContentModal } from "./ContentModal";
import { TypeModal } from "../../App";
import { IContact } from "../../types/contact";
import { useFetch } from "../../hooks/useFetch";
import { request } from "../../request";
import { HandleError } from "./HandleError";
import { ModalProps } from "../../types/contact";
import { observer } from "mobx-react-lite";
import Contact from "../../store/Contact";

export const Modal: React.FC<ModalProps> = observer(
  ({ selectContact, typeModal, setTypeModal }) => {
    const [username, setName] = React.useState(
      typeModal === TypeModal.update ? selectContact?.username || "" : ""
    );
    const [phone, setPhone] = React.useState(
      typeModal === TypeModal.update ? selectContact?.phone || "" : ""
    );
    const [defaultVal, setDefaultVal] = React.useState({
      username: selectContact?.username || "",
      phone: selectContact?.phone || "",
    });
    const [isValid, setValidation] = React.useState("");
    const [statusFetch, setStatusFetch] = React.useState(false);

    const validateInput = () => {
      if (
        selectContact?.phone === phone &&
        selectContact?.username === username
      ) {
        setValidation("Обновите значение");
        return true;
      }
      if (typeModal === TypeModal.remove) return;

      if (!username || !phone) {
        setValidation("Все поля должны быть заполнены!");
        return true;
      }
      if (phone.length > 11 || phone.length < 11) {
        setValidation("Телефон должен иметь  11 символов!");
        return true;
      }
    };

    const handleCloseModal = () => {
      Contact.clearError();

      setName("");
      setPhone("");
      setValidation("");
      setTypeModal(null);
    };

    React.useEffect(() => {
      if (statusFetch) {
        if (Contact.errorCreate || Contact.errorDelete || Contact.errorUpdate) {
        } else {
          handleCloseModal();
        }
        setStatusFetch(false);
      }
    }, [
      statusFetch,
      Contact.errorCreate,
      Contact.errorDelete,
      Contact.errorUpdate,
    ]);

    const handleAction = async () => {
      if (validateInput() && typeModal !== TypeModal.remove) {
        return;
      }

      switch (typeModal) {
        case TypeModal.add:
          Contact.add(username, phone);
          break;
        case TypeModal.remove:
          Contact.remove(selectContact!.id || 1);
          break;
        case TypeModal.update:
          Contact.update(selectContact?.id || 1, username, phone);
          break;
      }

      setTimeout(() => {
        setStatusFetch(true);
      }, 200);
    };

    return (
      <div className="modal">
        <div className="modal__body">
          <p onClick={handleCloseModal} className="modal__close">
            <CloseIcon />
          </p>
          <ContentModal
            errorValidate={isValid}
            typeMod={typeModal}
            name={username}
            phone={phone}
            setPhone={setPhone}
            setName={setName}
          />
          <HandleError
            error={[
              Contact.errorCreate,
              Contact.errorDelete,
              Contact.errorUpdate,
              isValid,
            ]}
          />
          <div className="modal__actions">
            <Button onClick={handleAction} size="large" variant="contained">
              {typeModal === TypeModal.add
                ? "Добавить"
                : typeModal === TypeModal.remove
                ? "Удалить"
                : "Сохранить"}
            </Button>
            <Button
              onClick={handleCloseModal}
              size="large"
              color="error"
              variant="contained"
            >
              Отменить
            </Button>{" "}
          </div>
        </div>
      </div>
    );
  }
);
