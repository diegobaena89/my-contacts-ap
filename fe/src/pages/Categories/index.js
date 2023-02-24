/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import InputSearch from '../../components/InputSearch';
import ListContainer from '../../components/ListContainer';
import CreateRecordHeader from '../../components/CreateRecordHeader';
import { Card } from './styles';

import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import CategoriesService from '../../services/CategoriesService';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';
import Loader from '../../components/Loader';
import LoadErrorMessage from '../../components/LoadErrorMessage';
import EmptyListContainer from '../../components/EmptyListContainer';
import SearchNotFoundContainer from '../../components/SearchNotFoundContainer';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryBeingDeteleted, setCategoryBeingDeleted] = useState({});
  const [isLoadingDeleteAction, setIsLoadingDeleteAction] = useState(true);

  const filteredCategories = useMemo(() => categories.filter((category) => (
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [categories, searchTerm]);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);

      const categoryData = await CategoriesService.listCategories(orderBy);

      setCategories(categoryData);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleChangeSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleTryAgain() {
    loadCategories();
  }

  async function handleOpenDeleteCategoryModal(id) {
    setIsModalVisible(true);

    const categoryData = await CategoriesService.getCategoryById(id);

    setIsLoadingDeleteAction(false);
    setCategoryBeingDeleted(categoryData);
  }

  function handleCloseDeleteCategoryModal() {
    setIsModalVisible(false);
    setCategoryBeingDeleted(null);
  }

  async function handleDeleteCategory() {
    try {
      setIsLoadingDeleteAction(true);

      await CategoriesService.deleteCategory(categoryBeingDeteleted.id);

      handleCloseDeleteCategoryModal();

      toast({
        type: 'success',
        text: 'A categoria foi deletada com sucesso!',
      });

      setCategories((prevState) => prevState.filter((category) => (
        category.id !== categoryBeingDeteleted.id
      )));
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao tentar excluir a categoria!',
      });
    } finally {
      setIsLoadingDeleteAction(false);
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isModalVisible}
        isLoading={isLoadingDeleteAction}
        title="Tem certeza que deseja remover a categoria ”Teste”?"
        onCancel={handleCloseDeleteCategoryModal}
        onConfirm={handleDeleteCategory}
      >
        Esta ação não poderá ser desfeita!
      </Modal>

      {categories.length > 0 && (
        <InputSearch
          searchTerm={searchTerm}
          handleChangeSearch={handleChangeSearch}
        />
      )}

      <CreateRecordHeader
        justifyContent={(
        hasError
          ? 'flex-end'
          : (categories.length > 0
            ? 'space-between'
            : 'center')
          )}
      >
        {(filteredCategories.length > 0 && !isLoading) && (
        <strong>
          {filteredCategories.length}
          {filteredCategories.length === 1 ? ' categoria' : ' categorias'}
        </strong>
        )}
        <Link to="/categories/new">Criar categoria</Link>
      </CreateRecordHeader>

      {hasError && (
        <LoadErrorMessage onTryAgain={handleTryAgain}>
          Ocorreu um erro ao obter as suas categorias!
        </LoadErrorMessage>
      )}

      {!hasError && (
        <>
          {(categories.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhuma categoria cadastrada!
                Clique no botão <strong>”Criar categoria”</strong> à cima para cadastrar
                a primeira!
              </p>
            </EmptyListContainer>
          )}

          {(categories.length > 0 && filteredCategories.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Search not found" />

              <span>Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.</span>
            </SearchNotFoundContainer>
          )}

          <ListContainer orderBy={orderBy}>
            {filteredCategories.length > 0 && (
              <header>
                <button type="button" onClick={handleOrderBy}>
                  <span>Nome</span>
                  <img src={arrow} alt="Arrow" />
                </button>
              </header>
            )}

            {filteredCategories.map((category) => (
              <Card key={category.id}>
                <div className="info">
                  <strong>{category.name}</strong>
                  <span>
                    {category.contacts_count}
                    {category.contacts_count === 1 ? ' contato' : ' contatos'}
                  </span>
                </div>
                <div className="actions">
                  <Link to={`/categories/edit/${category.id}`}>
                    <img src={edit} alt="Edit" />
                  </Link>
                  <button type="button" onClick={() => handleOpenDeleteCategoryModal(category.id)}>
                    <img src={trash} alt="Trash" />
                  </button>
                </div>
              </Card>
            ))}
          </ListContainer>
        </>
      )}
    </>
  );
}
