/* eslint-disable no-console */
// promisified fs module
require('dotenv').config()

// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('..', 'config', `${file}.json`)

  return fs.readJson(pathToConfigFile)
}

module.exports = {
  viewportWidth: 2000,
  viewportHeight: 900,
  defaultCommandTimeout: 1000,
  chromeWebSecurity: false,
  ...(on, config) => {
    // accept a configFile value or use development by default
    const file = config.env.configFile || 'qa'
    return getConfigurationByFile(file)
  },
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        experimentalOriginDependencies: true,
        createFile({ fileName, content }) {
          fs.writeFileSync(`cypress\\fixtures\\filesToTest\\${fileName}`, content)
          return true
        },
        deleteFile({ fileName }) {
          try {
            if (fs.existsSync(`cypress\\fixtures\\filesToTest\\${fileName}`)) {
              fs.unlinkSync(`cypress\\fixtures\\filesToTest\\${fileName}`)
              return true
            }
            return false
          } catch (e) {
            console.log(`### - Something went wrong: ${e}`)
            return false
          }
        }
      })
    },
    chromeWebSecurity: false
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/output.xml',
    toConsole: false
  }
}
