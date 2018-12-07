
export const validationForm = (context, form) => {
  let isValid = true;
  Object.keys(context[form]).forEach((field) => {
    if (!context[form][field].status) {
      context.$refs[field].validation();
      isValid = false;
    }
  });
  return isValid;
};

export default validationForm;