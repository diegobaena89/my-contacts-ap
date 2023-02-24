class ContactMapper {
  toPersistence(domainContact) {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.category_id,
    };
  }

  // toDomain(persistenceContact) {
  //   return {};
  // }
}

export default new ContactMapper();
