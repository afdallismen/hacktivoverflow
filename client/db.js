const faker = require('faker')

function Answer () {
  return {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    upvotes: faker.random.number(),
    downvotes: faker.random.number(),
    author: {
      name: faker.name.firstName(),
      avatar: faker.image.avatar()
    }
  }
}

function Question () {
  return {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    upvotes: faker.random.number({ min: 1, max: 10 }),
    downvotes: faker.random.number({ min: 1, max: 10 }),
    answers: generate('Answer', 3),
    author: {
      name: faker.name.firstName(),
      avatar: faker.image.avatar()
    }
  }
}

function generate (resource, n) {
  let constr = { Answer, Question }

  return Array.from(
    Array(n),
    el => constr[resource]()
  )
}

module.exports = function () {
  return {
    questions: generate('Question', 3),
  }
}
