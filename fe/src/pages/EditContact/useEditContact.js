/* eslint-disable quotes */
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ContactsService from "../../services/ContactsService";

import toast from "../../utils/toast";
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState("");

  const contactFormRef = useRef();
  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push("/");
          toast({
            type: "danger",
            text: "O contato não foi encontrado!",
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(formData) {
    try {
      const { name } = await ContactsService.updateContact(id, {
        ...formData,
        category_id: formData.categoryId,
      });

      setContactName(name);

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
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
