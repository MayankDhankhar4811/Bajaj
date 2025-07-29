const { getUserInfo, generateUserId } = require('../models/User');

const processData = (data) => {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0
  };

  data.forEach(item => {
    const trimmedItem = item.toString().trim();
    
    // Check if it's a number
    if (!isNaN(trimmedItem) && trimmedItem !== '') {
      const num = parseInt(trimmedItem);
      if (num % 2 === 0) {
        result.even_numbers.push(trimmedItem);
      } else {
        result.odd_numbers.push(trimmedItem);
      }
      result.sum += num;
    }
    // Check if it's alphabetic
    else if (/^[a-zA-Z]+$/.test(trimmedItem)) {
      result.alphabets.push(trimmedItem.toUpperCase());
    }
    // Everything else is special character
    else {
      result.special_characters.push(trimmedItem);
    }
  });

  return result;
};

const createConcatString = (alphabets) => {
  // Extract all individual characters from alphabets array
  const allChars = [];
  alphabets.forEach(item => {
    for (let char of item) {
      if (/[a-zA-Z]/.test(char)) {
        allChars.push(char.toLowerCase());
      }
    }
  });

  // Reverse the order
  allChars.reverse();

  // Apply alternating caps (even positions = uppercase, odd positions = lowercase)
  let result = '';
  for (let i = 0; i < allChars.length; i++) {
    if (i % 2 === 0) {
      result += allChars[i].toUpperCase();
    } else {
      result += allChars[i].toLowerCase();
    }
  }

  return result;
};

const bfhlPost = async (req, res) => {
  try {
    const { data } = req.body;

    // Validation
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array"
      });
    }

    // Process the data
    const processedData = processData(data);
    
    // Create concatenated string
    const concatString = createConcatString(processedData.alphabets);

    // Get user information from model
    const userInfo = getUserInfo();
    const user_id = generateUserId();

    // Prepare response
    const response = {
      is_success: true,
      user_id: user_id,
      email: userInfo.email,
      roll_number: userInfo.roll_number,
      odd_numbers: processedData.odd_numbers,
      even_numbers: processedData.even_numbers,
      alphabets: processedData.alphabets,
      special_characters: processedData.special_characters,
      sum: processedData.sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error in bfhlPost:', error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
};

const bfhlGet = async (req, res) => {
  try {
    res.status(200).json({
      operation_code: 1,
      methodDetails: "This is a GET request use POST request to get the response"
    });
  } catch (error) {
    console.error('Error in bfhlGet:', error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  bfhlPost,
  bfhlGet
};