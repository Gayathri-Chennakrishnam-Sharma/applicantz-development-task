const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create Employee for adding it to collection
router.post('/add-employee', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Employees list 
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Employee by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
