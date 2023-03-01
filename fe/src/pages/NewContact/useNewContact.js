/* eslint-disable quotes */
/* eslint-disable import/order */
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";
import { useRef } from "react";

export default function useNewContact() {
  const contactFormRef = useRef();

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact({
        ...contact,
        category_id: contact.categoryId,
      });

      contactFormRef.current.resetValues();

      toast({
        type: "success",
        text: "O contato foi cadastrado com sucesso!",
      });
    } catch {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao criar o contato!",
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
