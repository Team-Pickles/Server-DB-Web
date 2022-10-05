require('dotenv').config()

module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    dialect:"mariadb",
};

// port: process.env.DB_PORT 삭제
// mariadb의 경우 port: process.env.DB_PORT를 적지 않음
// 포트포워딩 문제로 예상됨