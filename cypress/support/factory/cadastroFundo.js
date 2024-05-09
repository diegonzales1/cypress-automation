import { generate } from 'cnpj'
import { faker } from '@faker-js/faker'

export default {
  dadosFundo: function (tipo) {
    const firstName = `Fundo ${faker.name.firstName()} Tipo ${tipo}`

    const data = {
      name: `${firstName}`,
      nickname: `Apelido ${firstName}`,
      cnpj: generate()
    }
    return data
  }
}
