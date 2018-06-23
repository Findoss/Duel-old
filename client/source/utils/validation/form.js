export default function (context, form) {
  let isValid = true;
  Object.keys(context[form]).forEach((field) => {
    if (!context[form][field].status) {
      context.$refs[field].validation();
      isValid = false;
    }
  });
  return isValid;
}
