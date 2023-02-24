import { useRef } from 'react';
import CategoryForm from '../../components/CategoryForm';
import PageHeader from '../../components/PageHeader';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function NewCategory() {
  const categoryFormRef = useRef();

  async function handleSubmit(formData) {
    try {
      await CategoriesService.createCategory(formData);

      categoryFormRef.current.resetValues();

      toast({
        type: 'success',
        text: 'A categoria foi cadastrada com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao criar a categoria!',
      });
    }
  }

  return (
    <>
      <PageHeader title="Nova Categoria" />

      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
