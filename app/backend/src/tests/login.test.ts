import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

import loginMock from './mocks/login.mock';

const {
  validLoginBody,
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
} = loginMock;

describe('POST /login', () => {
  beforeEach(function () { sinon.restore(); });

  it('Deve retornar um erro ao não enviar um email', async function () {
    const httpResponse = await chai.request(app).post('/login').send(noEmailLoginBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Deve retornar um erro ao não enviar um password', async function () {
    const httpResponse = await chai.request(app).post('/login').send(noPasswordLoginBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Deve retornar um erro ao enviar um email inválido', async function () {
    const httpResponse = await chai.request(app).post('/login').send(notExistingUserBody);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Deve retornar um erro ao enviar um email válido com um password inválido', async function () {
    const httpResponse = await chai.request(app).post('/login').send(existingUserWithWrongPasswordBody);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Deve retornar um token ao enviar um email e password válidos', async function () {
    const httpResponse = await chai.request(app).post('/login').send(validLoginBody);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });
});
