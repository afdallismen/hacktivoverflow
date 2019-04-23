const faker = require('faker')
const { ObjectId } = require('mongoose').Types

const models = require('../models')

module.exports = {
  clearDb: (...modelNames) => function (done) {
    Promise.all(
      modelNames.map(
        modelName => models[modelName].deleteMany({})
      )
    ).then(_ => done())
      .catch(done)
  },

  createUser: _ => {
    const rawPassword = faker.internet.password()
    return models.User
      .create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: rawPassword
      })
      .then(user => {
        user.rawPassword = rawPassword
        return user
      })
  },

  createQuestion: ({ author }) => {
    return models.Question
      .create({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        upvotes: faker.random.number(),
        downvotes: faker.random.number(),
        author: author ? author.id : ObjectId()
      })
  },

  createAnswer: ({ question, author }) => {
    return models.Answer.create({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      upvotes: faker.random.number(),
      downvotes: faker.random.number(),
      question: question ? question.id : ObjectId(),
      author: author ? author.id : ObjectId()
    })
  }
}
