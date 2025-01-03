const form = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const signin = document.getElementById('signin');
const logoutBtn = document.getElementById('logout__btn');

// Событие изменения в форме авторизации и отправка запроса на сервер
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
    xhr.responseType = 'json';
    xhr.onload = function() {
        if(xhr.response.success) {
            const userId = xhr.response.user_id;
            localStorage.setItem('userId', userId);
            logoutBtn.classList.add('logout__btn_active');
            welcomeDude(userId);
        } else {
            alert('Неверный логин или пароль');
        }
    }        
    xhr.send(formData);
    form.reset();
});

window.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if(userId) {
        welcomeDude(userId);
    }
});

// Событие клика на кнопку Выйти
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userId');
    signin.classList.add('signin_active');
    welcome.classList.remove('welcome_active');
    logoutBtn.classList.remove('logout__btn_active')    
})

// Функция приветствия пользователя 
function welcomeDude(userId) {
    signin.classList.remove('signin_active');
    welcome.classList.add('welcome_active');
    welcome.querySelector('#user_id').textContent = userId;
}