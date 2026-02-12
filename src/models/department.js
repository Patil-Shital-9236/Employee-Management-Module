module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        "Department",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
        },
        {
            tableName: "departments",
            timestamps: false,
        }
    );

    return Department;
};
