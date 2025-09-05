export const toEntity = async (document: any[]): Promise<any> => {
  const toEntity = document.flatMap((doc: any) => {
    const newDoc = {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      cpfCnpj: doc.cpfCnpj,
      mobilePhone: doc.mobilePhone,
      address: doc.address,
      addressNumber: doc.addressNumber,
      state: doc.state,
      complement: doc.complement,
      province: doc.province,
      postalCode: doc.postalCode,
      isSubscriber: doc.isSubscriber,
      tickets: doc.tickets,
    };
    return newDoc;
  });
  return toEntity;
};
