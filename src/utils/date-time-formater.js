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

  const fromAmPm = from.getHours() < 12 ? 'AM' : 'PM';
  const toAmPm = to.getHours() < 12 ? 'AM' : 'PM';

  const from12H = pad(
    from.getHours() < 13 ? from.getHours() : from.getHours() - 12,
    2,
  );
  const to12H = pad(to.getHours() < 13 ? to.getHours() : to.getHours() - 12, 2);

  return (
    dateDesciption +
    ' • ' +
    from12H +
    ':' +
    pad(from.getMinutes(), 2) +
    fromAmPm +
    ' - ' +
    to12H +
    ':' +
    pad(to.getMinutes(), 2) +
    toAmPm
  );
};

export const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) {
    num = '0' + num;
  }
  return num;
}
