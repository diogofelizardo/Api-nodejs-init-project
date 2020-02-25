module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        unique: true,
        allowNull: true,
        type: DataTypes.STRING
      },
      password_hash: {
        allowNull: true,
        type: DataTypes.STRING
      },
      role: {
        allowNull: true,
        type: DataTypes.ENUM('ADMIN', 'USER'),
        defaultValue: 'USER'
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
    });
  },

  down: queryInterface => {
    queryInterface.dropTable("users");
  }
};
