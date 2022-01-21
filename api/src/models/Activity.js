const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    // Sequelize crea el id por defecto   
    name: { // Nombre
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: { // Dificultad (Entre 1 y 5)
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: false,
    },
    duration: { // Duración
        type: DataTypes.STRING,
        allowNull: false,
    },
    season: { //Temporada (Verano, Otoño, Invierno o Primavera)
        type: DataTypes.ENUM('Summer', 'Fall', 'Winter','Spring'),
        allowNull: false,
    },
  //   reference: { //URL
  //     type: DataTypes.STRING,
  //     allowNull: true,
  // },
  },
  {
    timestamps: false
  },
  );
};