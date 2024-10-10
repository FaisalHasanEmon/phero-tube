function time(value) {
  const hr = parseInt(value / 3600);
  const remaining_second = value % 3600;
  const min = parseInt(remaining_second / 60);
  const sec = remaining_second % 60;

  return `${hr}hr ${min}min ${sec}sec ago`;
}

const Time = time(13885);
console.log(Time);
