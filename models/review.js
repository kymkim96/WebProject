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
        rank: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: 0,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);