module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: 'local',
        },
        admincode: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        receiveMail: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        admitPrivate: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);