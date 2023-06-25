'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model');
const foodModel = require('./food/model.js');
const Collection = require('./data-collection.js');
const userModel = require('../../src/auth//models/users');

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite::memory:" : process.env.DATABASE_URL; //this is for if i run the test(npm test) it wil use the sqlite3 if run dev or start it will use postgres see the package.json

// sequelizeOptions depends on the stage im working on(test, dev, production), i put it in condition where it will be an empty object if im testing, or developing localy
let sequelizeOptions = process.env.NODE_ENV === "production" ?
    {
          dialectOptions: {
                ssl: {
                      require: true,
                      rejectUnauthorized: false,
                  },
              },
          } :
          {} //the empty object
      
      let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

      // const DATABASE_URL = process.env.DATABASE_URL || "sqlite::memory:";
      // const sequelize = new Sequelize(DATABASE_URL);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
// const users= userModel
module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};