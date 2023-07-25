'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_menus', {
      order_id: {
        allowNull: false,
        references: {
          model: 'Orders', // Orders 모델을 참조합니다.
          key: 'order_id', // Orders 모델의 order_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Orders 모델의 order_id 삭제되면
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Menus', // Menus 모델을 참조합니다.
          key: 'menu_id', // Menus 모델의 menu_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Menus 모델의 menu_id 삭제되면
        primaryKey: true,
      },
      ea: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_menus');
  },
};
