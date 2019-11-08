module.exports = (sequelize, DataTypes) => (
    sequelize.define('review', {
        content: {
            type: DataTypes.STRING(140),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);