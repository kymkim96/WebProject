'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.Poster = require('./poster')(sequelize, Sequelize);

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Poster.hasMany(db.Review);
db.Review.belongsTo(db.Poster);

module.exports = db;
