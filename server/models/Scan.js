import mongoose from 'mongoose';

const ScanSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['url', 'password'],
    required: true,
  },
  input: {
    type: String, 
    // Usually bad practice to store passwords in plaintext logs. We'll store a blurred/masked version or omit it.
  },
  score: {
    type: Number,
    required: true,
  },
  result: {
    type: String, // "Safe", "Suspicious", "Dangerous" or "Strong", "Weak"
  },
  details: {
    type: Object, // Extra metadata
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Scan || mongoose.model('Scan', ScanSchema);
