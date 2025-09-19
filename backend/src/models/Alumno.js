import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Alumno extends Model {}

  Alumno.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carreraId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'carreras',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        field: 'carrera_id',
      },
    },
    {
      sequelize,
      modelName: 'Alumno',
      tableName: 'alumnos',
      timestamps: false,
    }
  );

  return Alumno;
};
