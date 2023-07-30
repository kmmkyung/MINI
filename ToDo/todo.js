window.addEventListener("DOMContentLoaded",()=>{
  console.log('loding')

  // 선언
  // 입력창, ul, li, button
  const inputText = document.querySelector('.input-text');
  const list = document.querySelector('.list');
  const addBtn = document.querySelector('.add-btn');    
  addBtn.addEventListener('click',function(){
    
    // item
    const item = document.createElement('span');
    item.innerText = inputText.value;
    item.classList.add('item')

    // like
    const like =  document.createElement('span');
    const likeIcon = document.createElement('i');
    like.classList.add('like');
    likeIcon.classList.add('fa-regular','fa-heart','heart')
    like.appendChild(likeIcon);

    // manage
    const manage = document.createElement('span');
    const cheakIcon = document.createElement('i');
    const clearIcon = document.createElement('i');
    manage.classList.add('manage')
    cheakIcon.classList.add('fa-solid','fa-check','check');
    clearIcon.classList.add('fa-solid','fa-xmark','clear');
    manage.appendChild(cheakIcon);
    manage.appendChild(clearIcon);
    
    const li = document.createElement('li');
    li.appendChild(like)
    li.appendChild(item)
    li.appendChild(manage)
    list.appendChild(li)
  })
})