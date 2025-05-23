function validateFlightDate(departureTime, arrivalTime) {
  try {
    if (!departureTime || !arrivalTime) {
      return;
    }
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    return arrival - departure >= 1800000 ? true : false;
  } catch (error) {}
}

module.exports = {
  validateFlightDate,
};
