import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username:       { type: String, minlength: 2, maxlength: 50, trim: true },
  email:          { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:       { type: String, required: function () { return !this.googleId; }, minlength: 6 },
  googleId:       { type: String },
  resetToken:     { type: String, select: false },
  resetTokenExpiry: { type: Date, select: false },
}, { timestamps: true });

userSchema.index({ email: 1 });                     // login lookup
userSchema.index({ googleId: 1 }, { sparse: true }); // Google auth
userSchema.index({ resetToken: 1 }, { sparse: true, expireAfterSeconds: 3600 }); // auto-TTL

userSchema.methods.comparePassword = async function (password) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.default.compare(password, this.password);
};

export default mongoose.model('User', userSchema);