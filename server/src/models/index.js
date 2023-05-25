// include all of your models here using CommonJS requires
const User = require("./User.js")
const Category = require("./Category.js")
const Clue = require("./Clue.js")
const Game = require("./Game.js")
const GameClue = require("./GameClue.js")
const ClueGuess = require("./ClueGuess.js")

module.exports = {User, Category, Clue, Game, GameClue, ClueGuess};