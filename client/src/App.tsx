import React from "react";
import "./App.scss";
import Button from "@mui/material/Button";
import { useFetch } from "./hooks/useFetch";
import axios from "axios";
import { request } from "./request";
import { IContact } from "./types/contact";
import { Error } from "./components/Error";
import { ContactItem } from "./components/ContactItem";
import { Loaders } from "./components/Loaders";
import { Modal } from "./components/modal/Modal";
import { observer } from "mobx-react-lite";
import Contact from "./store/Contact";

export enum TypeModal {
  remove = "remove",
  add = "add",
  update = "update",
}

const App = observer(() => {
  const [typeModal, setTypeModal] = React.useState<TypeModal | null>(null);
  const [selectContact, setSelectContact] = React.useState<IContact | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const [contacts, setContacts] = React.useState<IContact[]>([]);
  const [stateLoad, setStateLoad] = React.useState(true);
  React.useEffect(() => {
    if (Contact.contacts.length) {
      const arr: IContact[] = [];
      Contact.contacts.forEach((item, index) => {
        if (index < page * 10) {
          arr.push(item);
        }
      });
      if (Contact.contacts.length === arr.length) {
        setStateLoad(false);
      }
      setContacts(arr);
    }
  }, [page, Contact.contacts, Contact.contacts.length]);

  React.useEffect(() => {
    Contact.fetch();
  }, []);

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleOpenModal = () => {
    setTypeModal(TypeModal.add);
  };

  return (
    <div className="App">
      {typeModal !== null && (
        <Modal
          typeModal={typeModal}
          selectContact={selectContact}
          setTypeModal={setTypeModal}
        />
      )}
      <div className="App__body">
        <div className="App__header">
          <Button
            onClick={handleOpenModal}
            className="App__bttn"
            size="large"
            variant="contained"
          >
            Добавить контакт
          </Button>
        </div>
        <div className="App__list-contact">
          {Contact.errorFetch ? (
            <div className="App__center">
              <Error message={Contact.errorFetch} />
            </div>
          ) : Contact.loaded ? (
            contacts.map((item) => {
              return (
                <ContactItem
                  setSelectContact={setSelectContact}
                  setTypeModal={setTypeModal}
                  item={item}
                  key={item.id}
                />
              );
            })
          ) : (
            <div className="App__center">
              <Loaders color="green" />
            </div>
          )}
          {stateLoad ? (
            <div className="App__pagination">
              <Button
                onClick={handleChangePage}
                color="secondary"
                variant="contained"
              >
                Загрузить еще
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default App;
