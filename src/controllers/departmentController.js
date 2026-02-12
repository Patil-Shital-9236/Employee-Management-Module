const { Department, Employee } = require("../models");

/**
 * Create Department
 * POST /api/departments
 */
exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Department name is required" });
        }

        const department = await Department.create({ name });

        res.status(201).json(department);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/**
 * Get All Departments
 * GET /api/departments
 */
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();

        res.status(200).json(departments);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Delete Department
 * DELETE /api/departments/:id
 * Business Rule:
 * Deleting a department is NOT allowed if employees are mapped to it.
 */
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        const employeeExists = await Employee.findOne({
            where: { department_id: req.params.id },
        });

        if (employeeExists) {
            return res.status(400).json({
                message: "Cannot delete department. Employees are mapped to it.",
            });
        }

        await department.destroy();

        res.status(200).json({ message: "Department deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
