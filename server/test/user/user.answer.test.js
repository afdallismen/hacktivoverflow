const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')
const faker = require('faker')

const app = require('../../app')
const {
  clearDb,
  createUser,
  createQuestion,
  createAnswer
} = require('../../helpers/tests')
const { createToken } = require('../../helpers/auth')

const expect = chai.expect

chai.use(dirtyChai)
chai.use(chaiHttp)

describe('User Answers tests', function () {
  before(clearDb('User', 'Question', 'Answer'))
  before(function (done) {
    createUser()
      .then(user => {
        this.user = user
        this.token = createToken(user)
        return createQuestion({})
      })
      .then(question => {
        this.question = question
        done()
      })
      .catch(done)
  })

  describe('POST /users/:user_id/questions/:question_id/answers', function () {
    it('should send an object with 201 status code', function (done) {
      let createdAnswer = {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
      }

      chai
        .request(app)
        .post(`/users/${this.user.id}/questions/${this.question.id}/answers`)
        .set('Authorization', this.token)
        .send(createdAnswer)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.be.an('object')
          expect(res.body).to.have.property('answer')
          expect(res.body.answer).to.be.an('object')
          expect(res.body.answer).to.have.property('_id')
          expect(res.body.answer).to.have.property('title')
          expect(res.body.answer).to.have.property('description')
          expect(res.body.answer).to.have.property('upvotes')
          expect(res.body.answer).to.have.property('downvotes')
          expect(res.body.answer).to.have.property('author')
          expect(res.body.answer.title).to.be.equal(createdAnswer.title)
          expect(res.body.answer.description).to.be.equal(createdAnswer.description)
          expect(res.body.answer.upvotes).to.be.equal(0)
          expect(res.body.answer.downvotes).to.be.equal(0)
          expect(res.body.answer.author).to.be.equal(this.user.id)
          done()
        })
    })
  })

  describe('PUT /users/:user_id/questions/:question_id/answers/:answer_id/upvote', function () {
    before(function (done) {
      createAnswer({})
        .then(answer => {
          this.answer = answer
          done()
        })
        .catch(done)
    })

    after(function (done) {
      delete this.answer
      done()
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .put(`/users/${this.user.id}/questions/${this.question.id}/answers/${this.answer.id}/upvote`)
        .set('Authorization', this.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('answer')
          expect(res.body.answer).to.be.an('object')
          expect(res.body.answer).to.have.property('_id')
          expect(res.body.answer).to.have.property('title')
          expect(res.body.answer).to.have.property('description')
          expect(res.body.answer).to.have.property('upvotes')
          expect(res.body.answer).to.have.property('downvotes')
          expect(res.body.answer).to.have.property('author')
          expect(res.body.answer._id).to.be.equal(this.answer.id)
          expect(res.body.answer.upvotes).to.be.equal(this.answer.upvotes + 1)
          done()
        })
    })
  })

  describe('PUT /users/:user_id/questions/:question_id/answers/:answer_id/downvote', function () {
    before(function (done) {
      createAnswer({})
        .then(answer => {
          this.answer = answer
          done()
        })
        .catch(done)
    })

    after(function (done) {
      delete this.answer
      done()
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .put(`/users/${this.user.id}/questions/${this.question.id}/answers/${this.answer.id}/downvote`)
        .set('Authorization', this.token)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('answer')
          expect(res.body.answer).to.be.an('object')
          expect(res.body.answer).to.have.property('_id')
          expect(res.body.answer).to.have.property('title')
          expect(res.body.answer).to.have.property('description')
          expect(res.body.answer).to.have.property('upvotes')
          expect(res.body.answer).to.have.property('downvotes')
          expect(res.body.answer).to.have.property('author')
          expect(res.body.answer._id).to.be.equal(this.answer.id)
          expect(res.body.answer.downvotes).to.be.equal(this.answer.downvotes + 1)
          done()
        })
    })
  })
})
