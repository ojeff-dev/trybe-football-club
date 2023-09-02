import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

import MatchModel from '../database/models/MatchModel';
import matchesMock from './mocks/matches.mock';

const { matches, matchesInProgress, finishedMatches } = matchesMock;

describe('GET /matches', () => {
  beforeEach(function () { sinon.restore(); });

  it('Lista todas partidas(matches) corretamente com um status 200', async () => {
    sinon.stub(MatchModel, 'findAll')
      .resolves(matches as any);

    const httpResponse = await chai.request(app).get('/matches');

    expect(httpResponse.body).to.deep.equal(matches);
    expect(httpResponse.status).to.equal(200);
  });

  it('Lista as partidas(matches) em progresso(InProgress) corretamente com um status 200', async () => {
    const inProgressStatus = true;
    const matchesToReturn = inProgressStatus ? matchesInProgress : finishedMatches;
  
    sinon.stub(MatchModel, 'findAll')
      .resolves(matchesToReturn as any);

    const httpResponse = await chai.request(app).get(`/matches?inProgress=${inProgressStatus}`);

    expect(httpResponse.body).to.deep.equal(matchesInProgress);
    expect(httpResponse.status).to.equal(200);
  });
});
