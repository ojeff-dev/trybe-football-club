const validEmail = 'admin@admin.com';
const validPassword = 'secret_admin';
const noEmailLoginBody = { email: '', password: validPassword };
const noPasswordLoginBody = { email: validEmail, password: '' };
const notExistingUserBody = { email: 'notfound', password: validPassword };
const existingUserWithWrongPasswordBody = { email: validEmail, password: 'wrong_password' };
const hashPassword = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MjM5MTQ0MX0.st37LuPsrjMGNWPxoVOKfh3mXCoHrFe5a9BG-IAb1LI';

const validLoginBody = {
  email: validEmail,
  password: validPassword,
};

export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  hashPassword,
  validLoginBody,
};
