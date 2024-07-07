export function currentDate() {

  const date = new Date();

  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();

  day = (day < 10) ? `0${day}` : day;
  month = (month < 10) ? `0${month}` : month;

  return `${year}-${month}-${day}`;

}

export function dateToAge(date) {
  const then = new Date(date);
  const now = new Date();
  let age = now.getFullYear() - then.getFullYear();
  const monthDiff = now.getMonth() - then.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < then.getDate())) {
    age--;
  }

  return age;
}