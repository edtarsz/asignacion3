import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Carrera extends Model {}

  Carrera.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Carrera',
      tableName: 'carreras',
      timestamps: false,
    }
  );

  return Carrera;
};
