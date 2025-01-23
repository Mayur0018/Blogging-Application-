const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {createTokenForUser} = require("../services/authentication")
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
  const salt = "someRandomSalt"
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

UserSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }
  const salt = user.salt;
  const hasedPassword = user.password;

  const userProvidedHas = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hasedPassword !== userProvidedHas) throw new Error("Incoorect Password");

  const token = createTokenForUser(user);
  console.log(token);
  
  return token;
});
const User = model("User", UserSchema);

module.exports = User;
