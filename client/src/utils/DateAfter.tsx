import { format, addDays } from 'date-fns';

function AfterTomorrow() {
  const afterTomorrow = addDays(new Date(), 2);

  const EnglishMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = afterTomorrow.getDate();
  const month = EnglishMonths[afterTomorrow.getMonth()];
  const year = afterTomorrow.getFullYear();

  const dataFormattata = `${day} ${month} ${year}`


  return dataFormattata


}

export {AfterTomorrow}