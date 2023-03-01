/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import useEditContact from "./useEditContact";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

import Loader from "../../components/Loader";

export default function EditContact() {
  const {
    isLoading, contactName, contactFormRef, handleSubmit,
  } = useEditContact();

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? "Carregando..." : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
