const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dogs');


describe('bonus-server routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Adds an animal via POST', async() => {
    return request(app)
      .post('/api/v1/dogs')
      .send({
        name: 'Lion',
        type: 'german shepard',
        characteristic: 'long hair'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Lion',
          type: 'german shepard',
          characteristic: 'long hair'
        });
      });
  });

  it('Gets all animals via GET', async() => {
    const dogs = await Promise.all([
      { name: 'lion', type: 'german shepard', characteristic: 'long hair' },
      { name: 'waldo', type: 'dalmation', characteristic: 'spots' },
      { name: 'bear', type: 'husky', characteristic: 'thick fur' }
    ].map(dog => Dog.insert(dog)));
    
    return request(app)
      .get('/api/v1/dogs')
      .then(res => {
        dogs.forEach(dog => {
          expect(res.body).toContainEqual(dog);
        });
      });
  });

  it('Gets an animal by Id via GET', async() => {
    const dog = await Dog.insert({ name: 'robinette',
      type: 'chiwawwa',
      characteristic: 'small lots of energy' });
    
    return request(app)
      .get(`/api/v1/dogs/${dog.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'robinette',
          type: 'chiwawwa',
          characteristic: 'small lots of energy'
        });
      });
  });

  it('Deletes an dog by Id via DELETE', async() => {
    const dog = await Dog.insert({ name: 'travis', type: 'bulldog', characteristic: 'short stought' });
    
    return request(app)
      .delete(`/api/v1/dogs/${dog.id}`)
      .then(res => {
        expect(res.body).toEqual({ id: '1',
          name: 'travis', type: 'bulldog', characteristic: 'short stought'
        });
      });
  });


});
//  id: expect.any(String),
//       name: 'turtle',
//       type: 'reptile',
//       characteristic: 'protective shell'
