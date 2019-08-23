const fs = require('fs-extra');
const express = require('express');
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');

const {
  NODE_ENV,
  PORT,
  BASE_URL,
  NO_CLIENT,
  TEMP_DIR_PATH,
  CLEAN_UP_TEMP_FOLDER,
} = require('../../config/env');
const { logger, database } = require('./utils');

class App {
  constructor () {
    this._server = null;
    this._app = express();
    this._nuxt = new Nuxt(require('../../config/nuxt'));
    this._db = database;

    this._app.use([
      bodyParser.json(),
      require('./middlewares/http-access')(),
    ]);

    this._app.use('/api', [
      require('./middlewares/populate-config')(),
      require('./middlewares/debug-response-delay')(),
      require('./middlewares/populate-user')(),
      ...require('./api').map(routeFactory => routeFactory(express.Router())),
    ]);
  }

  async start () {
    logger.info(`Using configuration: "${NODE_ENV}"`);

    if (NO_CLIENT) {
      logger.info('NO_CLIENT is enabled, skipping client setup');
    } else {
      logger.info('Building client...');
      if (NODE_ENV !== 'production') {
        const builder = new Builder(this._nuxt);
        await builder.build();
      } else {
        await this._nuxt.ready();
      }
      this._app.use(this._nuxt.render);
      logger.success('Client ready');
    }

    await this._createTempDir();
    this._db.connect();

    this._server = await this._app.listen(PORT);
    const { address } = this._server.address();
    logger.success(`Server running at http://${address}:${PORT} (BASE_URL: ${BASE_URL})`);
  }

  async stop () {
    await this._db.disconnect();
    if (this._server) {
      await this._server.close();
      logger.success('Server stopped');
    } else {
      logger.info("No running servers, can't exit");
    }
  }

  async _createTempDir () {
    if (CLEAN_UP_TEMP_FOLDER && await fs.pathExists(TEMP_DIR_PATH)) await fs.remove(TEMP_DIR_PATH);

    await fs.ensureDir(TEMP_DIR_PATH);
    logger.success(`TEMP directory ready (cleanup: ${CLEAN_UP_TEMP_FOLDER})`);
  }
}

module.exports = new App();
