const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const saltRounds = 10;

/** The user schema attributes / characteristics / fields */
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  profile: {
    name: { type: String, default: "" },
    picture: { type: String, default: "" }
  },
  address: String,
  history: [
    {
      date: Date,
      paid: { type: Number, default: 0 }
    }
  ]
});

/** Hash the password before we save it to database */
UserSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/** compare password in the database and the one that the user provides */
UserSchema.methods.comparePassword = password => {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) return false;
    if (!res) return false;
    else return true;
  });
};

module.exports = mongoose.model("User", UserSchema);
