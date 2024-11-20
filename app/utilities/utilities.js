export const formatLabel = (key) => {
    // Replace underscores with spaces and capitalize each word
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) // Capitalize first letter
  }