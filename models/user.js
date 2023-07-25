'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Order, {
        sourceKey: 'user_id',
        forignKey: 'user_id',
      });
      this.hasMany(models.Dibs, {
        sourceKey: 'user_id',
        forignKey: 'user_id',
      });
      this.hasMany(models.Address, {
        sourceKey: 'user_id',
        forignKey: 'user_id',
      });
      this.hasOne(models.Store, {
        sourceKey: 'user_id',
        forignKey: 'user_id',
      });
      this.hasMany(models.Review, {
        sourceKey: 'user_id',
        forignKey: 'user_id',
      });
      this.hasMany(models.Cart, {
        sourceKey: 'user_id',
        forignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      sns_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: DataTypes.ENUM('local', 'kakao'),
        allowNull: false,
        defaultValue: 'local',
      },
      account: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('normal', 'admin'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return User;
};
