export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength;
};

export const validateISBN = (isbn) => {
  if (!isbn) return false;
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  return cleanISBN.length === 10 || cleanISBN.length === 13;
};

export const validatePhoneNumber = (phone) => {
  if (!phone) return true; // Optional field
  const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return re.test(phone);
};

export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
      return;
    }
    
    if (fieldRules.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
      return;
    }
    
    if (fieldRules.minLength && value && !validateMinLength(value, fieldRules.minLength)) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    if (fieldRules.maxLength && value && !validateMaxLength(value, fieldRules.maxLength)) {
      errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`;
      return;
    }
    
    if (fieldRules.isbn && value && !validateISBN(value)) {
      errors[field] = 'Invalid ISBN format';
      return;
    }
    
    if (fieldRules.phone && value && !validatePhoneNumber(value)) {
      errors[field] = 'Invalid phone number format';
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};