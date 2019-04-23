const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')
const faker = require('faker')

const app = require('../../app')
const { clearDb, createUser, createQuestion } = require('../../helpers/tests')
const { createToken } = require('../../helpers/auth')

const expect = chai.expect

chai.use(dirtyChai)
chai.use(chaiHttp)

describe('User Question tests', function () {
  before(clearDb('User', 'Question'))
  before(function (done) {
    createUser()
      .then(user => {
        this.user = user
        this.token = createToken(user)
        done()
      })
      .catch(done)
  })
  after(clearDb('User', 'Question'))

  describe('POST /users/:user_id/questions', function () {
    let createdQuestion = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph()
    }

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post(`/users/${this.user.id}/questions`)
        .set('Authorization', this.token)
        .send(createdQuestion)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('question')
          expect(res.body.question).to.be.an('object')
          expect(res.body.question).to.have.property('_id')
          expect(res.body.question).to.have.property('title')
          expect(res.body.question).to.have.property('description')
          expect(res.body.question).to.have.property('upvotes')
          expect(res.body.question).to.have.property('downvotes')
          expect(res.body.question).to.have.property('author')
          expect(res.body.question).to.have.property('answers')
          expect(res.body.question.title).to.equal(createdQuestion.title)
          expect(res.body.question.description).to.equal(createdQuestion.description)
          expect(res.body.question.upvotes).to.equal(0)
          expect(res.body.question.downvotes).to.equal(0)
          expect(res.body.question.author).to.equal(this.user.id)
          expect(res.body.question.answers).to.be.an('array')
          done()
        })
    })
  })

  describe('PUT /users/:user_id/questions/:question_id/upvote', function () {
    before(function (done) {
      createQuestion({ author: this.user })
        .then(question => {
          this.question = question
          done()
        })
        .catch(done)
    })

    after(function (done) {
      delete this.question
      done()
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .put(`/users/${this.user.id}/questions/${this.question.id}/upvote`)
        .set('Authorization', this.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('question')
          expect(res.body.question).to.be.an('object')
          expect(res.body.question).to.have.property('_id')
          expect(res.body.question).to.have.property('title')
          expect(res.body.question).to.have.property('description')
          expect(res.body.question).to.have.property('upvotes')
          expect(res.body.question).to.have.property('downvotes')
          expect(res.body.question).to.have.property('author')
          expect(res.body.question).to.have.property('answers')
          expect(res.body.question._id).to.be.equal(this.question.id)
          expect(res.body.question.upvotes).to.be.equal(this.question.upvotes + 1)
          done()
        })
    })
  })

  describe('PUT /users/:user_id/questions/:question_id/downvote', function () {
    before(function (done) {
      createQuestion({ author: this.user })
        .then(question => {
          this.question = question
          done()
        })
        .catch(done)
    })

    after(function (done) {
      delete this.question
      done()
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .put(`/users/${this.user.id}/questions/${this.question.id}/downvote`)
        .set('Authorization', this.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('question')
          expect(res.body.question).to.be.an('object')
          expect(res.body.question).to.have.property('_id')
          expect(res.body.question).to.have.property('title')
          expect(res.body.question).to.have.property('description')
          expect(res.body.question).to.have.property('upvotes')
          expect(res.body.question).to.have.property('downvotes')
          expect(res.body.question).to.have.property('author')
          expect(res.body.question).to.have.property('answers')
          expect(res.body.question._id).to.be.equal(this.question.id)
          expect(res.body.question.downvotes).to.be.equal(this.question.downvotes + 1)
          done()
        })
    })
  })
})
