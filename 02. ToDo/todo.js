window.addEventListener("DOMContentLoaded", () => {
  console.log("loding");

  // 입력창, ul, li, button
  const inputText = document.querySelector(".input-text");
  const list = document.querySelector(".list");
  const addBtn = document.querySelector(".add-btn");

  function addItem() {
    // 빈값이면 추가안됨
    if (inputText.value.trim() === "") {
      return;
    }

    // item
    const item = document.createElement("span");
    item.innerText = inputText.value;
    item.classList.add("item");

    // like
    const like = document.createElement("span");
    const likeIcon = document.createElement("i");
    like.classList.add("like");
    likeIcon.classList.add("fa-regular", "fa-heart", "heart");
    like.appendChild(likeIcon);

    like.addEventListener("click", function () {
      likeIcon.classList.toggle("fa-solid");
    });

    // manage
    const manage = document.createElement("span");
    const cheakIcon = document.createElement("i");
    const clearIcon = document.createElement("i");
    manage.classList.add("manage");
    cheakIcon.classList.add("fa-solid", "fa-check", "check");
    clearIcon.classList.add("fa-solid", "fa-xmark", "clear");
    manage.appendChild(cheakIcon);
    manage.appendChild(clearIcon);

    cheakIcon.addEventListener("click", function (e) {
      const target = e.target.parentNode.parentNode;
      target.classList.toggle("done");
    });
    clearIcon.addEventListener("click", function (e) {
      const target = e.target.parentNode.parentNode;
      list.removeChild(target);
    });

    const li = document.createElement("li");
    li.appendChild(like);
    li.appendChild(item);
    li.appendChild(manage);
    list.appendChild(li);

    inputText.value = "";
    inputText.focus();
  }

  // 버튼을 누르면, 입력창 엔터시 리스트 추가
  addBtn.addEventListener("click", addItem);
  inputText.addEventListener("keypress", (e) => {
    // console.log(e); // enter = 13  space = 32
    if (e.keyCode == 13) {
      addItem();
    }
  });
});
