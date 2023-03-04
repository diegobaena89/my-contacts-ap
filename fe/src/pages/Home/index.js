/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from "react-router-dom";

import { Container, Card } from "./styles";

import Loader from "../../components/Loader";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import emptyBox from "../../assets/images/empty-box.svg";
import magnifierQuestion from "../../assets/images/magnifier-question.svg";

import formatPhone from "../../utils/formatPhone";

import Modal from "../../components/Modal";
import InputSearch from "../../components/InputSearch";
import CreateRecordHeader from "../../components/CreateRecordHeader";
import ListContainer from "../../components/ListContainer";
import LoadErrorMessage from "../../components/LoadErrorMessage";
import EmptyListContainer from "../../components/EmptyListContainer";
import SearchNotFoundContainer from "../../components/SearchNotFoundContainer";
import useHome from "./useHome";

export default function Home() {
  const {
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearch,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleOrderBy,
    handleOpenDeleteModal,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

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

      {hasContacts && (
        <InputSearch
          searchTerm={searchTerm}
          handleChangeSearch={handleChangeSearch}
        />
      )}

      <CreateRecordHeader
        justifyContent={
          hasError ? "flex-end" : hasContacts ? "space-between" : "center"
        }
      >
        {!hasError && hasContacts && (
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

      {hasContacts && (
        <>
          {isListEmpty && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{" "}
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {isSearchEmpty && (
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
