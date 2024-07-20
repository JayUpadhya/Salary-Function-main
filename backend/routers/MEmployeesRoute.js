const express = require('express');
const Employee = require('../model/OrderForm/Employees');

const router = express.Router();

// Route for creating a new employee
router.post("/", async (req, res) => {
    try {
        const { firstname, lastname, email, phone, job, dateofjoining, dateofbirth, nic, age, gender, password, confirmPassword } = req.body;

        // Check for required fields
        if (!firstname || !lastname || !email || !phone || !job || !dateofjoining || !dateofbirth || !nic || !age) {
            return res.status(400).json({ message: "Please provide all required fields: firstname, lastname, email, phone, job, dateofjoining, dateofbirth, nic, age" });
        }

        const newEmployee = {
            firstname,
            lastname,
            email,
            phone,
            job,
            dateofjoining,
            dateofbirth,
            nic,
            age,
            gender, // Include gender if available
            // Exclude password and confirmPassword as they seem unnecessary for creating an employee
        };

        const employee = await Employee.create(newEmployee);

        return res.status(201).json(employee);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for retrieving all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            count: employees.length,
            data: employees, // Corrected from Employee to employees
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for retrieving a single employee by ID
// router.get('/:_id', async (req, res) => {
//     try {
//         const { _id } = req.params;
//         const employee = await Employee.findById(_id);
//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }
//         return res.status(200).json(employee);
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });

router.get('/filter', async (req, res) => {
    try {
        const  nic  = req.query.nic;
        const employee = await Employee.findOne({ nic: nic });
        // if (!employee) {
        //     return res.status(404).json({ message: "Employee not found" });
        // }
        return res.status(200).json(employee);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
