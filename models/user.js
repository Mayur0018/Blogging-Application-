const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const UserSchema = new Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

UserSchema.static("matchPassword", function (email, password) {
  const user = this.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }
  const salt = user.salt;
  const hasedPassword = user.password;

  const userProvidedHas = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hasedPassword !== userProvidedHas) throw new Error("Incoorect Password");
  return { ...user, password: undefined, salt: undefined };
});
const User = model("User", UserSchema);

module.exports = User;
