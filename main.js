document.addEventListener('DOMContentLoaded', () =>{
    'use strict';
    let comments = [];
    loadComments();
    timeSort();
    updateMenus();
    
    document.getElementById('comment-add').onclick = function(){
        if (document.querySelector('#comment-add').innerHTML === 'Добавить'){
            console.log('fsdf')
            let commentName = document.getElementById('comment-name');
            let commentBody = document.getElementById('comment-body');
            if (commentName.value != '' && commentBody.value != ''){
                let comment = {
                    name : commentName.value,
                    body : commentBody.value,
                    time : Math.floor(Date.now() / 1000)
                }
                
                commentName.value = '';
                commentBody.value = '';

                comments.push(comment);
                saveComments();
                showComments();
                updateMenus();
            }
        }    
    }
    

    //Сохранение комментариев в LocalStorage
    function saveComments(){
        localStorage.setItem('comments', JSON.stringify(comments));
    }
    //Подгрузка комментариев из LocalStorage
    function loadComments(){
        if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
        showComments();
    }
    //Функция для отображения комментариев
    function showComments (){
        let commentField = document.getElementById('comment-field');
        let out = '';
        comments.forEach(function(item){
            out += 
            `<div class="row comment alert alert-secondary" role="alert">
                <div class="col-11">${item.name} • <em class='small'>${timeConverter(item.time)}</em></div>
                <div class='dropdown col p-0'>
                    <div class="context-menu"></div>
                    <div class="dropdown-content">
                        <a href='javascript://' class='edit-comment'>Редактировать</a>
                        <a href='javascript://' class='delete-comment'>Удалить</a>
                    </div>
                </div>    
                <br>
                <span>${item.body}</span>
            </div>`;
        });
        commentField.innerHTML = out;
    }
    //Функция для сортировки комментариев по времени
    function timeSort(){
        document.getElementById("time-sort").onclick = () => {
            const btn = document.querySelector('#time-sort');
            
                if (btn.innerHTML === 'Сначала новые') {
                    btn.innerHTML = 'Сначала старые' 
                    comments.sort((prev,next) => next.time - prev.time);
                }    
                else{    
                    comments.sort((prev,next) => prev.time - next.time);
                    btn.innerHTML = 'Сначала новые';
                }    
            showComments();
            updateMenus();
        } 
    }

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

    function updateMenus(){
        contextMenu();
        editComment();
        deletecomment();
        //Функция для вызова контекстного меню черех 3 точки
        function contextMenu(){
            const dropdownMenuElems = document.querySelectorAll('.context-menu');
            const dropdownContentElems = document.querySelectorAll('.dropdown-content');
            const deactive = () => {
                dropdownContentElems.forEach(btn => btn.classList.remove('show'));
            }
            dropdownMenuElems.forEach((btn,i) => {
                btn.addEventListener('click', () => {
                    if (!dropdownContentElems[i].classList.contains('show')){
                        deactive();
                        dropdownContentElems[i].classList.toggle("show");
                    }
                });
            });
            //скрытие контекстного меню при нажатии в пустую область
            window.onclick = function(event) {
                if (!event.target.matches('.context-menu')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                    }
                }
                }
            }
        }  
        //Функция для удаления комментария  
        function deletecomment(){
            const deleteCommentButton = document.querySelectorAll(".delete-comment");
            const CommentElems = document.querySelectorAll('.comment');
            deleteCommentButton.forEach((btn,i) => {
                btn.addEventListener('click', () => {
                    CommentElems[i].outerHTML = '';
                    comments.splice(i,1);
                    saveComments();
                    
                });
            });
        }
        //Функция для редактирования комментария
        function editComment(){    
            const editCommentButton = document.querySelectorAll(".edit-comment");
            let commentName = document.getElementById('comment-name');
            let commentBody = document.getElementById('comment-body');
            const btnAdd = document.querySelector('#comment-add');
            editCommentButton.forEach((btn,i) => {
                let editOneComment = function() {
                    btn.removeEventListener('click', editOneComment);
                    commentName.value = comments[i].name;
                    commentBody.value = comments[i].body;
                    btnAdd.innerHTML = 'Применить';
                    let applyEdit  = function(){
                    
                        comments[i].name = commentName.value;
                        comments[i].body = commentBody.value;
                        comments[i].time = Math.floor(Date.now() / 1000);
                        saveComments();
                        showComments();
                        btnAdd.innerHTML = 'Добавить'; 
                        commentName.value = '';
                        commentBody.value = '';
                        updateMenus();
                        
                    }; 
                    btnAdd.addEventListener('click', applyEdit ,{once: true} )   
                    
                };
                btn.addEventListener('click', editOneComment,{once: true});
                //btn.removeEventListener('click', editOneComment);
                console.log(i,btn)
                
                
            });
        }



        
    }
    
          
    
})