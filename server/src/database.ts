import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'flytyper_db',
    username: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    ssl: true,
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

interface Db {
  sequelize: Sequelize
}

const db: Db = {
  sequelize: sequelize
};

module.exports = db;


