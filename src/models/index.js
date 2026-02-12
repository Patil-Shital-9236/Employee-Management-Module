const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DepartmentModel = require("./department");
const EmployeeModel = require("./employee");

const Department = DepartmentModel(sequelize, DataTypes);
const Employee = EmployeeModel(sequelize, DataTypes);

Employee.belongsTo(Department, {
  foreignKey: "department_id",
  onDelete: "RESTRICT",
});

Department.hasMany(Employee, {
  foreignKey: "department_id",
});

Employee.belongsTo(Employee, {
  as: "manager",
  foreignKey: "manager_id",
  onDelete: "SET NULL",
});

Employee.hasMany(Employee, {
  as: "subordinates",
  foreignKey: "manager_id",
});

module.exports = {
  sequelize,
  Employee,
  Department,
};
