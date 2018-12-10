const field = (context, formName, fieldName) => {
  const ctx = context;
  const input = ctx[formName][fieldName];

  input.status = 'pending';

  return input.rules
    .reduce((acc, rule) => acc.then(rule), Promise.resolve(input.value))
    .then(() => {
      input.status = 'valid';
      input.error = '';
    })
    .catch((error) => {
      input.status = 'invalid';
      input.error = ctx.$t(`form.errors[${error.message}]`);
    });
};


const form = (context, formName) => {
  const ctx = context;
  let isValid = true;

  Object.keys(ctx[formName]).forEach((fieldName) => {
    if (ctx[formName][fieldName].status !== 'valid') {
      field(ctx, formName, fieldName);
      isValid = false;
    }
  });
  return isValid;
};

// const form = (context, formName) => {
//   const ctx = context;
//   return new Promise((resolve, reject) => {
//     Object.keys(ctx[formName]).forEach((fieldName) => {
//       if (ctx[formName][fieldName].status !== 'valid') {
//         field(ctx, formName, fieldName);
//         reject(new Error());
//       }
//     });
//     resolve(true);
//   });
// };

export default {
  field,
  form,
};