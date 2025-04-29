import {
  InferCreationAttributes,
  InferAttributes,
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

const { sequelize } = require('./database.ts');


export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {

  declare id: number;
  declare userName: string;
  declare wpm: number;


  static initModel(sequelize: Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        wpm: {
          type: DataTypes.INTEGER,
        },
      },
      { sequelize,
        tableName: 'users',
        timestamps: true
      }
    );
  }
}

User.initModel(sequelize);