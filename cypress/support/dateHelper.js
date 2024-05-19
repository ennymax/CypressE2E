export const randomDate = function () {
  // Get the current date
  const currentDate = new Date();

  // Get the maximum number of days in the past to select a date from
  const maxDaysAgo = 20_000;

  // Generate a random number of days between 1 and the maximum days ago
  const randomDaysAgo = Math.floor(Math.random() * maxDaysAgo) + 1;

  // Calculate the selected date by subtracting the random number of days from the current date
  const selectedDate = new Date(currentDate);
  selectedDate.setDate(currentDate.getDate() - randomDaysAgo);

  // Format the selected date as a string in the format YYYY/MM/DD
  const year = selectedDate.getFullYear();
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = selectedDate.getDate().toString().padStart(2, '0');

  const selectedDateString = `${year}-${month}-${day}`;

  return selectedDateString;
};

export const getCurrentDate = function () {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getCurrentDateForPolicy = function () {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${year}-${month}-${day}`;
};
