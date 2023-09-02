import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

import MatchModel from '../database/models/MatchModel';
import matchesMock from './mocks/matches.mock';
import JWT from '../utils/JWT';

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

  it('Retorna um erro ao tentar finalizar uma partida sem um token - status 401', async () => {
    const matchID = 41;
    const httpResponse = await chai.request(app).patch(`/matches/${matchID}/finish`);

    expect(httpResponse.body).to.deep.equal({ message: 'Token not found' });
    expect(httpResponse.status).to.equal(401);
  });

  it('Retorna um erro ao tentar finalizar uma partida usando um token inválido - status 401', async () => {
    const matchID = 41;
    const httpResponse = await chai.request(app).patch(`/matches/${matchID}/finish`).set('authorization', 'invalidToken');

    expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
    expect(httpResponse.status).to.equal(401);
  });

  it('Finaliza uma partida com sucesso - status 200', async () => {
    sinon.stub(JWT, 'verify').resolves('valid_token');

    const matchID = 41;
    const httpResponse = await chai.request(app).patch(`/matches/${matchID}/finish`).set('authorization', 'valid_token');

    expect(httpResponse.body).to.deep.equal({ message: 'Finished' });
    expect(httpResponse.status).to.equal(200);
  });
});
