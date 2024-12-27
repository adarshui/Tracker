const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Role can be 'admin' or 'user'
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }], // Associated companies
  communications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Communication' }], // Associated communications
}, {
  timestamps: true, // Created at and updated at timestamps
});

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified or new
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare hashed password
};

module.exports = mongoose.model('User', userSchema);
