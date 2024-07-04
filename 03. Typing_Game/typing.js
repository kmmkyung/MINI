window.addEventListener('DOMContentLoaded',function(){

  // 클릭하면 게임화면 보이기
  const startBtn = document.querySelector('.click');
  startBtn.addEventListener('click',function(){
    const startscreen  = document.querySelector('header');
    startBtn.classList.add('hidden')
    startscreen.style.height='200px'
  })

  // 시작
  const wordInput = document.querySelector('#word-input');
  const currentWord = document.querySelector('#current-word');
  const scoreDisplay = document.querySelector('#score');
  const timeDisplay = document.querySelector('#time');
  const messageDisplay = document.querySelector('#message');
  // 고정 시간
  const GAME_TIME = 5;
  // 랜덤 단어 api 주소
  const API_URL = 'https://random-word-api.herokuapp.com/word?number=100';
  // 랜덤 단어 담을 변수
  let words = [];
  // 랜덤 api 오류 방지 변수
  let isReady = false;
  // 스코어점수 전역변수  
  let score = 0;
  // 시간 전역변수
  let time = 0;
  time = GAME_TIME;
  let timeInterval;
  // 인터벌이 쌓이지 않게 게임상태 변수
  let isPlaying = false;

  // 셋팅 init()
  init()
  // 프로미스 문법 _______________________
  // function init(){
  //   // API_URL에서 통신(tetch)를 받은 후 -> res(응답)받은 제이슨을 값(data)을 받고-> words에 넣어줘
  //   const res = fetch(API_URL)
  //   .then((res)=>{return res.json()})
  //   .then((data)=>{words=data});
  // }

  // async await 문법 __________________
  async function init(){
    const res = await fetch(API_URL);
    const data = await res.json();
    // 6글자 이상은 탈락
    words = data.filter(item => {return item.length<7})
    isReady = true;
    console.log(words);
    
  }

  // 타이핑 내용이 같은지 검사
  wordInput.addEventListener('input',(e)=>{
    const typedText = e.target.value; // wordInput의 내용
    const currentText = currentWord.innerText;
    // console.log(typedText == currentText);
    // 대소문자 구별하니 둘 다 대문자로 바꿔서 같으면 + api가 실행되면 조건문
    if(typedText.toUpperCase() === currentText.toUpperCase() && isReady){
      addScore() // 스코어 점수 올려줌
      setNewWord() // 타이핑 하면 다음 단어 및 input 리셋
    }
  })

  // 타이핑 내용이 같으면 스코어 점수 올려줌
  function addScore(){
    score = score+1;
    // console.log(score);
    scoreDisplay.innerText = score;
  }

  // 게임종료
  function gameOver(){
    clearInterval(timeInterval)
    isPlaying = false;
    timeInterval = null;
    messageDisplay.innerText="GAME OVER!"
    score = 0;
  }

  // 시간 카운트다운
  function countDown(){
    time = time-1;
    timeDisplay.innerText = time;
    if(time == 0){
      gameOver();
    }
  }

  // 타이핑 하면 다음 단어 및 input 리셋
  function setNewWord(){
    time = GAME_TIME;
    wordInput.value='';
    messageDisplay.innerText="Now playing!"
    // 랜덤수 만들기
    const randomIndex = Math.floor(Math.random()*words.length);
    currentWord.innerText = words[randomIndex]
    if(!isPlaying){
      // 게임시간인터벌
      timeInterval = setInterval(countDown,1000);
      isPlaying = true;
    }
  }
})

