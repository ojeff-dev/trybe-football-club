import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

import MatchModel from '../database/models/MatchModel';
import matchesMock from './mocks/matches.mock';

const { matches } = matchesMock;

describe('GET /matches', () => {
  beforeEach(function () { sinon.restore(); });

  it('Lista todas partidas(matches) corretamente com um status 200', async () => {
    sinon.stub(MatchModel, 'findAll')
      .resolves(matches as any);

    const httpResponse = await chai.request(app).get('/matches');

    expect(httpResponse.body).to.deep.equal(matches);
    expect(httpResponse.status).to.equal(200);
  });
});
