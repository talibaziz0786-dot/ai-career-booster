const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const user = await User.create({
  email,
  password: hashedPassword,
});