/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Card } from "./styles";

import Loader from "../../components/Loader";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import emptyBox from "../../assets/images/empty-box.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";
import formatPhone from "../../utils/formatPhone";

import Modal from "../../components/Modal";
import InputSearch from "../../components/InputSearch";
import CreateRecordHeader from "../../components/CreateRecordHeader";
import ListContainer from "../../components/ListContainer";
import LoadErrorMessage from "../../components/LoadErrorMessage";
import EmptyListContainer from "../../components/EmptyListContainer";
import SearchNotFoundContainer from "../../components/SearchNotFoundContainer";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState({});
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleChangeSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleOpenDeleteModal(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      handleCloseDeleteModal();

      toast({
        type: "success",
        text: "O contato foi deletado com sucesso!",
      });

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      );
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao deletar o contato!",
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
        isLoading={isLoadingDelete}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        Essa ação não poderá ser desfeita!
      </Modal>

      {contacts.length > 0 && (
        <InputSearch
          searchTerm={searchTerm}
          handleChangeSearch={handleChangeSearch}
        />
      )}

      <CreateRecordHeader
        justifyContent={
          hasError
            ? "flex-end"
            : contacts.length > 0
            ? "space-between"
            : "center"
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? " contato" : " contatos"}
          </strong>
        )}
        <Link to="/contacts/new">Criar contato</Link>
      </CreateRecordHeader>

      {hasError && (
        <LoadErrorMessage onTryAgain={handleTryAgain}>
          Ocorreu um erro ao obter os seus contatos!
        </LoadErrorMessage>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{" "}
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Search not found" />

              <span>
                Nenhum resultado foi encontrado para{" "}
                <strong>”{searchTerm}”</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          <ListContainer orderBy={orderBy}>
            {filteredContacts.length > 0 && (
              <header>
                <button type="button" onClick={handleOrderBy}>
                  <span>Nome</span>
                  <img src={arrow} alt="Arrow" />
                </button>
              </header>
            )}

            {filteredContacts.map((contact) => (
              <Card key={contact.id}>
                <div className="info">
                  <div className="contact-name">
                    <strong>{contact.name}</strong>
                    {contact.category.name && (
                      <small>{contact.category.name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{formatPhone(contact.phone)}</span>
                </div>

                <div className="actions">
                  <Link to={`/contacts/edit/${contact.id}`}>
                    <img src={edit} alt="Edit" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenDeleteModal(contact)}
                  >
                    <img src={trash} alt="Trash" />
                  </button>
                </div>
              </Card>
            ))}
          </ListContainer>
        </>
      )}
    </Container>
  );
}
