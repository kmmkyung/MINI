window.addEventListener("DOMContentLoaded", () => {
  // console.log('로딩완료');

  const day = document.querySelector(".day");
  const clock = document.querySelector(".clock");
  const noon = document.querySelector(".noon");
  // console.log(clock);

  // 0. 날짜, 시간 등 현재 정보를 가져오기 위해 Date() object를 사용!
  // Date내장객체는 new 생성자 함수를 이용해 꺼내올 수 있다!
  // console에 년도, 월, 일 / 시, 분, 초 찍기!
  // console.log(`${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDay()}`);
  // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  // 월, 일은 배열순번이라 0부터 시작! 1월 - 0, 7일 - 6

  // 1. 날짜 함수
  function nowday() {
    // 1-1. 날짜를 숫자가 아닌 요일로 만들기
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    let changeday = weekday[new Date().getDay()];
    
    // 1-2. 2자리수 만들기
    // type가 String일때 사용할 수 있는 padStart() 사용!
    // 현재 Number인 월을 String로 바꾸기
    let month = String(new Date().getMonth()+1)
    console.log(typeof(month)); // string
    changemonth = month.padStart(2,"0")

    let date = String(new Date().getDate())
    changedate = date.padStart(2,"0")
    
    // 최종 출력!
    day.innerText = `${new Date().getFullYear()}.${changemonth}.${changedate}.${changeday}`
  };
  nowday();

  // 2. 시간 함수
  function nowClock() {

    // 2-1-1. 2자리수 만들기 
    // let hours = String(new Date().getHours()).padStart(2,"0")
    // let minutes = String(new Date().getMinutes()).padStart(2,"0")
    // let seconds = String(new Date().getSeconds()).padStart(2,"0")

    // 2-1-2. 2자리수 만들기
    const addZero = function(num){
      return num<10?"0"+num:num;
    }

    let hours = new Date().getHours();
    let minutes = addZero(new Date().getMinutes());
    let seconds = addZero(new Date().getSeconds());

    // 2-2. 오전/오후 업데이트
    let changenoon = "AM"
    if(hours>11){
      hours = addZero(new Date().getHours()-12)
      changenoon = "PM"
    }

    // 최종 출력!
    noon.innerText = changenoon;
    clock.innerText = `${hours}:${minutes}:${seconds}`;
  }

  nowClock();
  setInterval(nowClock, 1000);
});
