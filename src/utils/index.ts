
function formatDate(time: any = Date.now()) {
  let date = new Date(+time)
  // let year = date.getFullYear()
  // let month = date.getMonth()+1
  // let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  // let seconds = date.getSeconds()

  let preArr = [...Array(10)].map((item, index) => '0' + index)
  // return `${year}-${preArr[month] || month}-${preArr[day] || day} ${preArr[hours] || hours}:${preArr[minutes] || minutes}:${preArr[seconds] || seconds}`
  return `${preArr[hours] || hours}:${preArr[minutes] || minutes}`
}

export {
  formatDate
}