/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
  static get relationMappings() {
    const { Game, ClueGuess, Clue } = require("./index.js")
    return {
      games: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        join: {
          from: "users.id",
          to: "games.userId"
        }
      },
      clueGuesses: {
        relation: Model.HasManyRelation,
        modelClass: ClueGuess,
        join: {
          from: "users.id",
          to: "clueGuesses.userId"
        }
      },
      clues: {
        relation: Model.ManyToManyRelation,
        modelClass: Clue,
        join: {
          from: "users.id",
          through: {
            from: "clueGuesses.userId",
            to: "clueGuesses.clueId"
          },
          to: "clues.id"
        }
      }
    }
  }
}

module.exports = User;
