// 计算时间戳
export function offTime(value: number) {
  var date = new Date(value);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let dt = new Date();
  let current = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
  let system =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  if (current === system) {
    return h + m;
  } else {
    return Y + M + D;
  }
}
