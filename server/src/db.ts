import { Sequelize } from '@sequelize/core'

const sequelize = new Sequelize("Contact-book", "postgres", "demion2289", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

export default sequelize;