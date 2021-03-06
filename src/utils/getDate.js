/* getDate(0);//当天日期
getDate(-7);//7天前日期 */

function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "" + month;
    m = month < 10 ? ('0' + month) : month;
  }
  return m;
}

export function getDate(day) {
  var today = new Date();

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}  