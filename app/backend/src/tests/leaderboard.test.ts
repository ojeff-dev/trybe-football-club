import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

import LeaderboardService from '../services/leaderboard.service';
import leaderboardMock from './mocks/leaderboard.mock';
import JWT from '../utils/JWT';

const { leaderboardByHome, leaderboardByAway } = leaderboardMock;

describe('GET /leaderboard/home', () => {
  let leaderboardService: LeaderboardService;

  beforeEach(() => {
    leaderboardService = new LeaderboardService();
  });

  it('Lista a tabela de classificação considerando apenas os resultados obtidos em casa(home) - status 200', async () => {
    const serviceResponse = await leaderboardService.getLeaderboard('homeTeam');
    expect(serviceResponse.status).to.equal('success');
    expect(serviceResponse.data).to.deep.equal(leaderboardByHome);
  
    const httpResponse = await chai.request(app).get('/leaderboard/home');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(serviceResponse.data);
  });
});

describe('GET /leaderboard/away', () => {
  let leaderboardService: LeaderboardService;

  beforeEach(() => {
    leaderboardService = new LeaderboardService();
  });

  it('Lista a tabela de classificação considerando apenas os resultados obtidos fora de casa(away) - status 200', async () => {
    const serviceResponse = await leaderboardService.getLeaderboard('awayTeam');
    expect(serviceResponse.status).to.equal('success');
    expect(serviceResponse.data).to.deep.equal(leaderboardByAway);
  
    const httpResponse = await chai.request(app).get('/leaderboard/away');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(serviceResponse.data);
  });
});

describe('GET /leaderboard', () => {
  let leaderboardService: LeaderboardService;

  beforeEach(() => {
    leaderboardService = new LeaderboardService();
  });
  
  it.skip('Lista a tabela de classificação considerando todos os resultados(home and away) - status 200', async () => {
    //
  });
});
