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

const { teams } = teamsMock;

describe('GET /teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('Lista todos os times corretamente com um status 200', async () => {
    sinon.stub(TeamModel, 'findAll')
      .resolves(teams as any);

    const httpResponse = await chai.request(app).get('/teams');

    expect(httpResponse.body).to.deep.equal(teams);
    expect(httpResponse.status).to.equal(200);
  });
});
