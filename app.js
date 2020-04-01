const buttons = document.getElementsByTagName("span");
const buttonArray = Array.from(buttons);

buttonArray.forEach(button => {
    button.addEventListener('click', e => {
       if (e.target.classList.contains('operator')) {
           console.log(e.target)
       }
    })
});

