import React from "react";
import "../../styles/modal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { ContentModal } from "./ContentModal";
import { TypeModal } from "../../App";
import { IContact } from "../../types/contact";
import { useFetch, useFetching } from "../../hooks/useFetch";
import { request } from "../../request";
import { HandleError } from "./HandleError";
import { ModalProps } from "../../types/contact";

export const Modal: React.FC<ModalProps> = ({
  selectContact,
  typeModal,
  setTypeModal,
  setContacts,
  contacts,
}) => {
  const [username, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isValid, setValidation] = React.useState("");
  const [statusFetch, setStatusFetch] = React.useState(false);
  const [errorUpdate, loadedUpdate, fetchUpdate, setErrorUpdate] = useFetch(
    async () => {
      const response = await request.put<string>(`/${selectContact?.id}`, {
        username,
        phone,
      });
      setContacts((prev): any =>
        prev.map((item) => {
          if (item.id === selectContact?.id) {
            return response.data;
          }
          return item;
        })
      );
    }
  );

  const [errorCreate, loadedCreate, fetchCreate, setErrorCreate] = useFetch(
    async () => {
      const response = await request.post<IContact>("/", { username, phone });
      const arr = contacts;
      arr.unshift(response.data);
      setContacts(arr.map((elem) => elem));
    }
  );

  const [errorDelete, loadedDelete, fetchDelete, setErrorDelete] = useFetch(
    async () => {
      const response = await request.delete<IContact[]>(
        `/${selectContact?.id}`
      );
      setContacts((prev) =>
        prev.filter((item) => item.id !== selectContact?.id)
      );
    }
  );

  const validateInput = () => {
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
    setName("");
    setPhone("");
    setValidation("");
    setTypeModal(null);
  };

  React.useEffect(() => {
    if (statusFetch) {
      if (errorCreate || errorDelete || errorUpdate) {
      } else {
        handleCloseModal();
      }
      setStatusFetch(false);
    }
  }, [statusFetch, errorCreate, errorDelete, errorUpdate]);

  const handleAction = async () => {
    setErrorUpdate("");
    setErrorDelete("");
    setErrorCreate("");

    if (validateInput() && typeModal !== TypeModal.remove) {
      return;
    }
    switch (typeModal) {
      case TypeModal.add:
        fetchCreate();
        break;
      case TypeModal.remove:
        fetchDelete();
        break;
      case TypeModal.update:
        fetchUpdate();
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
          selectContact={selectContact}
          errorValidate={isValid}
          typeMod={typeModal}
          name={username}
          phone={phone}
          setPhone={setPhone}
          setName={setName}
        />
        <HandleError error={[errorCreate, errorDelete, errorUpdate, isValid]} />
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
};
