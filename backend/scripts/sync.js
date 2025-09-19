import { sequelize } from '../src/models/index.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing the database:', error);
    process.exit(1);
  }
};

syncDatabase();
