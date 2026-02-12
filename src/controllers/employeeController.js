const { Employee, Department } = require("../models");

/**
 * Create Employee
 * POST /api/employees
 */
exports.createEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email, department_id, manager_id } = req.body;

        // Check if department exists
        const department = await Department.findByPk(department_id);
        if (!department) {
            return res.status(400).json({ message: "Invalid department_id" });
        }

        // If manager_id is provided, validate manager
        if (manager_id) {
            if (manager_id == req.body.id) {
                return res.status(400).json({ message: "Employee cannot be their own manager" });
            }

            const manager = await Employee.findByPk(manager_id);
            if (!manager) {
                return res.status(400).json({ message: "Invalid manager_id" });
            }
        }

        const employee = await Employee.create({
            first_name,
            last_name,
            email,
            department_id,
            manager_id: manager_id || null,
        });

        res.status(201).json(employee);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/**
 * Get All Employees with Department & Manager (JOIN)
 * GET /api/employees
 */
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: [
                {
                    model: Department,
                    attributes: ["name"],
                },
                {
                    model: Employee,
                    as: "manager",
                    attributes: ["first_name", "last_name"],
                },
            ],
        });

        res.status(200).json(employees);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Get Single Employee by ID
 * GET /api/employees/:id
 */
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, {
            include: [
                { model: Department, attributes: ["name"] },
                {
                    model: Employee,
                    as: "manager",
                    attributes: ["first_name", "last_name"],
                },
            ],
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Update Employee
 * PUT /api/employees/:id
 */
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Validate department if updating
        if (req.body.department_id) {
            const department = await Department.findByPk(req.body.department_id);
            if (!department) {
                return res.status(400).json({ message: "Invalid department_id" });
            }
        }

        // Validate manager if updating
        if (req.body.manager_id) {
            if (req.body.manager_id == req.params.id) {
                return res.status(400).json({ message: "Employee cannot be their own manager" });
            }

            const manager = await Employee.findByPk(req.body.manager_id);
            if (!manager) {
                return res.status(400).json({ message: "Invalid manager_id" });
            }
        }

        await employee.update(req.body);

        res.status(200).json(employee);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/**
 * Delete Employee
 * DELETE /api/employees/:id
 * If employee is a manager → set subordinates manager_id = NULL
 */
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // VERY IMPORTANT: If this employee is a manager,
        // set manager_id = NULL for all subordinates
        await Employee.update(
            { manager_id: null },
            { where: { manager_id: req.params.id } }
        );

        await employee.destroy();

        res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
