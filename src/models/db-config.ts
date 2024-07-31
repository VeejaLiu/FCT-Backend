import { DataTypes, Model, Sequelize } from 'sequelize';
import { env } from '../env';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fifa-career.db',
});

export async function closeSequelize() {
    await sequelize.close();
}
