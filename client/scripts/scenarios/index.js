// RE
const scenarios = {};

scenarios.makeActiveRune = require('../scenarios/makeActiveRune');
scenarios.makeInactiveRune = require('../scenarios/makeInactiveRune');
scenarios.loadGame = require('../scenarios/loadGame');
scenarios.swapRune = require('../scenarios/swapRune');
scenarios.deleteRune = require('../scenarios/deleteRune');
scenarios.refillBoard = require('../scenarios/refillBoard');
scenarios.dropRunes = require('../scenarios/dropRunes');
scenarios.showSuggestion = require('../scenarios/showSuggestion');
scenarios.cleanSuggestion = require('../scenarios/cleanSuggestion');
scenarios.waitOpponent = require('../scenarios/waitOpponent');
scenarios.noGame = require('../scenarios/noGame');
scenarios.nextStep = require('../scenarios/nextStep');

module.exports = scenarios;
