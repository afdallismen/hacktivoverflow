const chai = require('chai')
const chaiHttp = require('chai-http')
const dirtyChai = require('dirty-chai')

const app = require('../app')
const {
  clearDb,
  createQuestion,
  createAnswer
} = require('../helpers/tests')

const expect = chai.expect

chai.use(dirtyChai)
chai.use(chaiHttp)

describe('Question Tests', function () {
  describe('GET /questions', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get('/questions')
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('questions')
          expect(res.body.questions).to.be.an('array')
          done()
        })
    })
  })

  describe('GET /questions/:question_id', function () {
    before(clearDb('Question'))
    before(function (done) {
      createQuestion({})
        .then(question => {
          this.question = question
          return createAnswer({ question })
        })
        .then(answer => {
          this.question.answers.push(answer)
          return this.question.save()
        })
        .then(question => {
          this.question = question
          done()
        })
        .catch(done)
    })
    after(clearDb('Question'))

    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get(`/questions/${this.question._id}`)
        .end((err, res) => {
          expect(err).to.be.null()
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('question')
          expect(res.body.question).to.be.an('object')
          expect(res.body.question).to.have.property('_id')
          expect(res.body.question).to.have.property('title')
          expect(res.body.question).to.have.property('description')
          expect(res.body.question).to.have.property('upvotes')
          expect(res.body.question).to.have.property('downvotes')
          expect(res.body.question).to.have.property('answers')
          expect(res.body.question.answers).to.be.an('array')
          expect(res.body.question.answers).to.have.length(1)
          expect(res.body.question.answers[0]).to.have.property('_id')
          expect(res.body.question.answers[0]).to.have.property('title')
          expect(res.body.question.answers[0]).to.have.property('description')
          expect(res.body.question.answers[0]).to.have.property('upvotes')
          expect(res.body.question.answers[0]).to.have.property('downvotes')
          done()
        })
    })
  })
})
