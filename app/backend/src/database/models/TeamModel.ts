import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import db from '.';

export default class Team extends
  Model<InferAttributes<Team>,
  InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'team',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
