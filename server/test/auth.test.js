const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')
const faker = require('faker')

const app = require('../app')
const { createUser } = require('../helpers/tests')
const { verifyToken } = require('../helpers/auth')

const expect = chai.expect

chai.use(dirtyChai)
chai.use(chaiHttp)

describe('Authentication tests', function () {
  describe('POST /auth/register', function () {
    const registeredUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .send(registeredUser)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('user')
          expect(res.body.user).to.have.property('_id')
          expect(res.body.user).to.have.property('name')
          expect(res.body.user).to.have.property('email')
          expect(res.body.user).to.not.have.property('password')
          expect(res.body.user.name).to.be.equal(registeredUser.name)
          expect(res.body.user.email).to.be.equal(registeredUser.email)
          done()
        })
    })
  })

  describe('POST /auth/login', function () {
    before(function (done) {
      createUser()
        .then(user => {
          this.user = user
          done()
        })
        .catch(done)
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({
          email: this.user.email,
          password: this.user.rawPassword
        })
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('user')
          expect(res.body).to.have.property('token')
          expect(res.body.user).to.have.property('_id')
          expect(res.body.user).to.have.property('name')
          expect(res.body.user).to.have.property('email')
          expect(res.body.user).to.not.have.property('password')
          expect(res.body.user._id).to.be.equal(this.user.id)
          expect(verifyToken(res.body.token)._id).to.be.equal(this.user.id)
          done()
        })
    })
  })
})
