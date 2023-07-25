'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Users 모델을 참조합니다.
          key: 'user_id', // Users 모델의 userId를 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Users 모델의 userId가 삭제되면
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stores', // Stores 모델을 참조합니다.
          key: 'store_id', // Stores 모델의 store_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Stores 모델의 store_id 삭제되면
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      request: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Addresses', // Addresses 모델을 참조합니다.
          key: 'address_id', // Addresses 모델의 address_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Addresses 모델의 address_id 삭제되면
      },
      status: {
        type: Sequelize.ENUM('0', '1', '2', '3', '4'),
        allowNull: false,
        defaultValue: '1',
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
    await queryInterface.dropTable('Orders');
  },
};
