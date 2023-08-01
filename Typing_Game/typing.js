window.addEventListener('DOMContentLoaded',function(){

  // 클릭하면 이동
  const startBtn = document.querySelector('.click');
  startBtn.addEventListener('click',function(){
    const startscreen  = document.querySelector('header');
    startBtn.classList.add('hidden')
    startscreen.style.height='200px'
  })
})