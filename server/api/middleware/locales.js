const config = require('../../config');

const i18next = require('i18next');
const i18nextFs = require('i18next-sync-fs-backend');
const koaI18next = require('koa-i18next');

const resurces = i18next
  .use(i18nextFs)
  .init({
    backend: {
      loadPath: './static/locales/{{ns}}{{lng}}.json',
      addPath: './static/locales/{{ns}}{{lng}}.json',
    },
    load: 'languageOnly',
    preload: ['en', 'ru'],
    lng: 'en',
    fallbackLng: 'en',
    ns: '_',
    defaultNS: '_',
    debug: config.logger.koa,
  });

module.exports = () => koaI18next(resurces, {

  // lookupCookie: 'i18next',
  // lookupPath: 'lng',
  // lookupFromPathIndex: 0,
  // lookupQuerystring: 'lng',
  // lookupSession: 'lng',
  // order: ['header'],

  next: true,
});
