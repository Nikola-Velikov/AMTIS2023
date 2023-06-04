

Array.from(document.querySelectorAll("button")).forEach((el) =>
  el.addEventListener("click", (e) => {


    localStorage.setItem("gamemode", el.textContent);
   localStorage.setItem('player1', document.querySelectorAll('input')[0].value)
   localStorage.setItem('player2', document.querySelectorAll('input')[1].value)
   localStorage.setItem('rows', document.querySelectorAll('input')[2].value)
   localStorage.setItem('cols', document.querySelectorAll('input')[3].value)

  })
);