import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

import TeamModel from '../database/models/TeamModel';
import teamsMock from './mocks/teams.mock';

const { teams, oneTeam } = teamsMock;

describe('GET /teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('Lista todos os times corretamente com um status 200', async () => {
    sinon.stub(TeamModel, 'findAll')
      .resolves(teams as any);

    const httpResponse = await chai.request(app).get('/teams');

    expect(httpResponse.body).to.deep.equal(teams);
    expect(httpResponse.status).to.equal(200);
  });

  it('Lista um único time de acordo com o ID, com um status 200', async () => {
    sinon.stub(TeamModel, 'findByPk')
      .resolves(oneTeam as any);

    const teamId = 7;
    const httpResponse = await chai.request(app).get(`/teams/${teamId}`);

    expect(httpResponse.body).to.deep.equal(oneTeam);
    expect(httpResponse.status).to.equal(200);
  });

  it('Retorna uma mensagem de erro ao buscar um time com ID inválido - status 404', async () => {
    sinon.stub(TeamModel, 'findByPk')
      .resolves(null);

    const teamId = 999999;
    const httpResponse = await chai.request(app).get(`/teams/${teamId}`);

    expect(httpResponse.body).to.deep.equal({ message: 'Team not found' });
    expect(httpResponse.status).to.equal(404);
  });
});
