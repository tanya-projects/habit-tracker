import dayjs from 'dayjs';

export default function FormatDate(dateDayjs) {
  const formattedDate = dayjs(dateDayjs).format('DD MMM YYYY');
  return formattedDate;
}
