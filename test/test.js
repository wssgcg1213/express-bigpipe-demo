require('mocha')
require('should')
var request = require('supertest')
var app = require('../app')

describe('GET /', function () {
  this.timeout(5000)
  it('response with bigpipe', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('transfer-encoding', 'chunked')
      .end(done)
  })
})