// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET /api/companies
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/companies
router.post('/companies', async (req, res) => {
  const company = new Company(req.body);
  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/companies/:id
router.put('/companies/:id', async (req, res) => {
  try {
    // Validate ID format (optional but good practice)
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Update the company
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Enforce schema validation on update
    });

    // Handle case where company does not exist
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Send the updated company back to the client
    res.status(200).json(updatedCompany);
  } catch (error) {
    // Log the error and respond with a 400 status
    console.error('Error updating company:', error);
    res.status(400).json({ message: error.message });
  }
});


const mongoose = require('mongoose');

router.delete('/companies/:id', async (req, res) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid company ID format' });
    }

    // Attempt to delete the company
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ message: 'Company deleted successfully', deletedCompany });
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
