// кажется тут должен быть код...

// Подсказка №1: Содержимое тега textarea хранится в его свойстве value

// Подсказка №2: Не забывайте, что LocalStorage и SessionStorage могут хранить только строки в виде пар ключ/значение
const addCommentElem = document.querySelector('#add_comment');
const commentBlockElem = document.querySelector('.comment_block');
if (!localStorage.getItem('comments')){
    localStorage.setItem('comments', JSON.stringify([]));
}
commentElems = JSON.parse(localStorage.getItem('comments'))
for (let i = 0; i < commentElems.length; i++){
    commentBlockElem.insertAdjacentHTML('afterbegin',`<p class='comment_body'> ${commentElems[i]} </p>`);
}
function addComment(){
    if (addCommentElem.value !=''){
        commentElems.push(addCommentElem.value);
        localStorage.setItem('comments', JSON.stringify(commentElems));
        commentBlockElem.insertAdjacentHTML('afterbegin',`<p class='comment_body'> ${addCommentElem.value} </p>`);
    addCommentElem.value='';
    }
}