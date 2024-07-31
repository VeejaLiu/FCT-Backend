import { DataTypes } from 'sequelize';
import { sequelize } from '../../models/db-config';

export const PlayerModel = sequelize.define('', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
    },
});
