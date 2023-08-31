const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const noEmailLoginBody = { email: '', password: validPassword };
const noPasswordLoginBody = { email: validEmail, password: '' };
const notExistingUserBody = { email: 'notfound', password: validPassword };
const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };

const validLoginBody = {
  email: validEmail,
  password: validPassword,
};

const genericAdminUserInDB = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: validEmail,
  password: validPassword,
};

export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  validLoginBody,
  genericAdminUserInDB,
};
