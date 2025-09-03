exports.validateSignup = ({ name, email, mobile, password }) => {
  if (!name || !email || !mobile || !password) {
    return "All fields are required";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }
  if (!/^[0-9]{10}$/.test(mobile)) {
    return "Mobile must be 10 digits";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

exports.validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format";
  }
  return null;
};
