const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genres', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};