// User information model
const USER_INFO = {
  full_name: "john_doe",
  date_of_birth: "17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123"
};

// Function to get user information
const getUserInfo = () => {
  return USER_INFO;
};

// Function to generate user_id
const generateUserId = () => {
  return `${USER_INFO.full_name}_${USER_INFO.date_of_birth}`;
};

module.exports = {
  getUserInfo,
  generateUserId,
  USER_INFO
};