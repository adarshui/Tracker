const CommunicationMethod = require('../models/CommunicationMethod');

// Add a new communication method
exports.addCommunicationMethod = async (req, res) => {
  const { name, description, sequence, mandatory } = req.body;
  try {
    const communicationMethod = new CommunicationMethod({
      name,
      description,
      sequence,
      mandatory,
    });
    await communicationMethod.save();
    res.status(201).json(communicationMethod);
  } catch (error) {
    console.error('Error creating communication method:', error);
    res.status(500).json({ error: 'Failed to create communication method.' });
  }
};

// Get all communication methods
exports.getAllCommunicationMethods = async (req, res) => {
  try {
    const methods = await CommunicationMethod.find().sort({ sequence: 1 });
    res.status(200).json(methods);
  } catch (error) {
    console.error('Error fetching communication methods:', error);
    res.status(500).json({ error: 'Failed to fetch communication methods.' });
  }
};

// Update a communication method
exports.updateCommunicationMethod = async (req, res) => {
  const { id } = req.params;
  const { name, description, sequence, mandatory } = req.body;

  try {
    const updatedMethod = await CommunicationMethod.findByIdAndUpdate(
      id,
      { name, description, sequence, mandatory },
      { new: true }
    );
    if (!updatedMethod) {
      return res.status(404).json({ error: 'Communication method not found.' });
    }
    res.status(200).json(updatedMethod);
  } catch (error) {
    console.error('Error updating communication method:', error);
    res.status(500).json({ error: 'Failed to update communication method.' });
  }
};

// Delete a communication method
exports.deleteCommunicationMethod = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMethod = await CommunicationMethod.findByIdAndDelete(id);
    if (!deletedMethod) {
      return res.status(404).json({ error: 'Communication method not found.' });
    }
    res.status(200).json({ message: 'Communication method deleted successfully.' });
  } catch (error) {
    console.error('Error deleting communication method:', error);
    res.status(500).json({ error: 'Failed to delete communication method.' });
  }
};
