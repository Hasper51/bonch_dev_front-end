document.addEventListener('DOMContentLoaded', () =>{
    'use strict';
    let comments = [];
    loadComments();
    updateMenus();
    document.getElementById('comment-add').onclick = function(){
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

    function saveComments(){
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments(){
        if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
        showComments();
    }

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


    document.getElementById("time-sort").onclick = () => {
        const btn = document.querySelector('#time-sort');
        
            if (btn.innerHTML === 'Сначала старые') {
                btn.innerHTML = 'Сначала новые' 
                comments.sort((prev,next) => next.time - prev.time);
            }    
            else{    
                comments.sort((prev,next) => prev.time - next.time);
                btn.innerHTML = 'Сначала старые';
            }    
        showComments();
        updateMenus();
        console.log(comments)
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
        const deleteCommentButton = document.querySelectorAll(".delete-comment");
        const deleteCommentElems = document.querySelectorAll('.comment');
        deleteCommentButton.forEach((btn,i) => {
            btn.addEventListener('click', () => {
                deleteCommentElems[i].outerHTML = '';
                comments.splice(i,1);
                saveComments();
                
            });
        });
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
    
})