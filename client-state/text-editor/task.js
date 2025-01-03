const storedText = localStorage.getItem('text');
const textEditor = document.getElementById('editor');

// Загрузка текста из localStorage
if(storedText !== null) {
    textEditor.value = storedText;
}

// Редактирование текста 
textEditor.addEventListener('input', () => {
    localStorage.setItem('text', textEditor.value);
})

// Кнопка удаления текста
const removeBtn = document.getElementById('remove_btn');
removeBtn.addEventListener('click', () => {
    textEditor.value = '';
    localStorage.removeItem('text');
})