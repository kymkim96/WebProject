module.exports = (sequelize, DataTypes) => (
    sequelize.define('poster', {
        //작품 제목
        content: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        //연극, 뮤지컬 별점 정보
        rank: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        //연극, 뮤지컬 포스터 분류
        classify: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);

