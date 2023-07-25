'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        targetKey: 'user_id',
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Menu, {
        targetKey: 'menu_id',
        foreignKey: 'menu_id',
      });

      this.belongsTo(models.Store, {
        targetKey: 'store_id',
        foreignKey: 'store_id',
      });
    }
  }
  Cart.init(
    {
      cart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      store_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ea: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      timesTampes: true,
      underscored: false,
      modelName: 'Cart',
      tableName: 'carts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Cart;
};
