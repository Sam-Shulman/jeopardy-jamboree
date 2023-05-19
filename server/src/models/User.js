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
    const { Game, UserQuestion, Question } = require("./index.js")
    return {
      games: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        join: {
          from: "users.id",
          to: "games.userId"
        }
      },
      userQuestions: {
        relation: Model.HasManyRelation,
        modelClass: UserQuestion,
        join: {
          from: "users.id",
          to: "userQuestion.userId"
        }
      },
      questions: {
        relation: Model.ManyToManyRelation,
        modelClass: Question,
        join: {
          from: "users.id",
          through: {
            from: "userQuestion.userId",
            to: "userQuestion.questionId"
          },
          to: "questions.id"
        }
      }
    }
  }
}

module.exports = User;
