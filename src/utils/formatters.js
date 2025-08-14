export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-UG').format(number);
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-GB');
};

export const formatBookTitle = (title) => {
  if (!title) return '';
  return title.replace(/\b\w/g, l => l.toUpperCase());
};

export const formatUserName = (firstName, lastName) => {
  if (!firstName && !lastName) return '';
  return `${firstName || ''} ${lastName || ''}`.trim();
};

export const formatStatus = (status) => {
  if (!status) return '';
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const getStatusColor = (status) => {
  const colors = {
    available: 'text-green-600 bg-green-100',
    checked_out: 'text-blue-600 bg-blue-100',
    reserved: 'text-yellow-600 bg-yellow-100',
    overdue: 'text-red-600 bg-red-100',
    lost: 'text-gray-600 bg-gray-100',
    damaged: 'text-orange-600 bg-orange-100'
  };
  return colors[status] || 'text-gray-600 bg-gray-100';
};

export const getConditionColor = (condition) => {
  const colors = {
    new: 'text-green-600 bg-green-100',
    good: 'text-blue-600 bg-blue-100',
    fair: 'text-yellow-600 bg-yellow-100',
    poor: 'text-orange-600 bg-orange-100',
    damaged: 'text-red-600 bg-red-100'
  };
  return colors[condition] || 'text-gray-600 bg-gray-100';
};