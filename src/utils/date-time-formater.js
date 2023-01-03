export const monthShorthands = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const pickupTimeDescription = (from, to) => {
  const now = new Date();

  const dateDesciption =
    now.getDate() === from.getDate()
      ? 'Today'
      : from.getDate() + ' ' + monthShorthands[from.getMonth()];

  return (
    dateDesciption +
    ' • ' +
    amPmTimeDescription(from) +
    ' - ' +
    amPmTimeDescription(to)
  );
};

export function amPmTimeDescription(dateTime) {
  const amPm = dateTime.getHours() < 12 ? 'AM' : 'PM';

  const hours = pad(
    dateTime.getHours() < 13 ? dateTime.getHours() : dateTime.getHours() - 12,
    2,
  );

  const mins = pad(dateTime.getMinutes(), 2);

  return hours + ':' + mins + amPm;
}

export const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) {
    num = '0' + num;
  }
  return num;
}
