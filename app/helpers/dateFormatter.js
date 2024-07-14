const { format } = require("date-fns");

// Function to get formatted date
const getFormattedDate = (dateFormat = "dd_MM_yyyy") => {
    // console.log(dateFormat, format(new Date(), dateFormat))
  return format(new Date(), dateFormat);
};

module.exports = { getFormattedDate };
