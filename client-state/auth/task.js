const form = document.getElementById('signin__form');
const xhr = new XMLHttpRequest();
let userId = document.getElementById('user_id');
const signin = document.getElementById('signin');
const welcome = document.getElementById('welcome');


document.addEventListener('DOMContentLoaded', function() {
    
    if (localStorage.getItem('user_id')) {
        showWelcome();

    } else {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            const formData = new FormData(form);
        
            xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
            xhr.responseType = 'json';
            xhr.send(formData);
        
            xhr.onload = function() {

                if(!xhr.response.success) {
                    alert('Неверный логин/пароль');

                } else {
                    //console.log(xhr.response);
                    
                    localStorage.setItem('user_id', xhr.response['user_id']);
                    showWelcome();
                };
            };

            form.reset();
        });
    };
});



function showWelcome() {
     
     welcome.classList.add('welcome_active');
     signin.classList.remove('signin_active');

     userId.textContent = localStorage.getItem('user_id');

     welcome.insertAdjacentHTML('afterend', `
        <button class="signup_btn" id="signup">Выйти</button>
        `);

    const signUpBtn = document.getElementById('signup');

    if(signUpBtn) {
        signUpBtn.addEventListener('click', () => {
            console.log('signup');
    
            welcome.classList.remove('welcome_active');
            signin.classList.add('signin_active');
    
            localStorage.clear();
            //signUpBtn.remove();
            location.reload();
        });
    };
};