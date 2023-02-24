import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../components/CategoryForm';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';
import Loader from '../../components/Loader';

export default function EditCategory() {
  const { id } = useParams();
  const history = useHistory();

  const categoryFormRef = useRef();

  const [categoryName, setCategoryName] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategory() {
      try {
        const categoryData = await CategoriesService.getCategoryById(id);

        categoryFormRef.current.setFieldValues(categoryData);
        setCategoryName(categoryData.name);
        setIsLoading(false);
      } catch {
        history.push('/categories');
        toast({
          type: 'danger',
          text: 'A categoria não foi encontrada!',
        });
      }
    }

    loadCategory();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const { name } = await CategoriesService.updateCategory(id, formData);

      setCategoryName(name);
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o nome da categoria!',
      });
    } finally {
      toast({
        type: 'success',
        text: 'O nome da categoria foi alterado com sucesso!',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${categoryName}`} />

      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
