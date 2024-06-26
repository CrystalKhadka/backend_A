const request = require('supertest');
const app = require('../index');

// test token
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzdhNDE2ZmM0ODFhMGU1ODRkY2FmNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTExNzAwOX0.wZHEt6CDwWNGepyDgnYCTQW2LnsVmb4pgB58ELsB7Mo';

describe('API Testing', () => {
  it('GET /test', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Test API is Working!....');
  });

  it('GET Products | Fetch All products', async () => {
    const response = await request(app)
      .get('/api/product/get_all_products')
      .set('authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual('All products fetched successfully');
  });

  it('POST /api/user/create', async () => {
    const response = await request(app).post('/api/user/create').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'j@gmail.com',
      password: '123456',
    });
    if (response.body.success) {
      expect(response.body.message).toEqual('User Created Successfully');
    } else {
      expect(response.body.message).toEqual('User Already Exists');
    }
  });

  it('POST /api/user/login', async () => {
    const response = await request(app).post('/api/user/login').send({
      email: 'j@gmail.com',
      password: '123456',
    });
    if (response.body.success) {
      expect(response.body.message).toEqual('User logged in successfully');
      // token length check

      expect(response.body.token.length).toBeGreaterThan(10);
      // user name check
      expect(response.body.user.firstName).toEqual('John');
    } else {
      if (response.body.message === 'User not found') {
        expect(response.body.message).toEqual('User not found');
      } else {
        expect(response.body.message).toEqual('Invalid Password');
      }
    }
  });
});
