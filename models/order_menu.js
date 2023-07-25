'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, {
        targetKey: 'order_id',
        foreignKey: 'order_id',
      });
      this.belongsTo(models.Menu, {
        targetKey: 'menu_id',
        foreignKey: 'menu_id',
      });
    }
  }
  Order_menu.init(
    {
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ea: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timesTampes: true,
      underscored: false,
      modelName: 'Order_menu',
      tableName: 'order_menus',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Order_menu;
};
