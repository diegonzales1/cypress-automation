import { faker } from '@faker-js/faker'

export default {
  dadosUsuario: function () {
    const data = {
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: `${faker.internet.email()}`,
      password: `${faker.string.uuid()}`
    }
    return data
  }
}
