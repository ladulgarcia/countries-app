const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {  // ID (Código de 3 letras) *
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    name: {  // Nombre *
      type: DataTypes.STRING,
      allowNull: false
    },
    flags: { // Imagen de la bandera *
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: { // Continente o Region *
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: { // Capital *
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: { // Subregión
      type: DataTypes.STRING
      allowNull: true,
    },
    area: { // Área
      type: DataTypes.INTEGER
      allowNull: true,
    },
    population: {  // Población
      type: DataTypes.INTEGER
      allowNull: true,
    },
    maps:{
      type: DataTypes.STRING
      allowNull: true,
    },
    { 
      timestamps: false 
    }
  });
};









