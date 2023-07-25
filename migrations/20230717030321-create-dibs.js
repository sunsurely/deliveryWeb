'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dibs', {
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Stores', // Stores 모델을 참조합니다.
          key: 'store_id', // Stores 모델의 store_id 참조합니다.
        },
        primaryKey: true,
        onDelete: 'CASCADE', // 만약 Stores 모델의 store_id 삭제되면
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', // Users 모델을 참조합니다.
          key: 'user_id', // Users 모델의 userId를 참조합니다.
        },
        primaryKey: true,
        onDelete: 'CASCADE', // 만약 Users 모델의 userId가 삭제되면
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
    await queryInterface.dropTable('Dibs');
  },
};
