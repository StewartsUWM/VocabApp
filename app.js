// app.js

const vocabularyList = JSON.parse(localStorage.getItem('vocabularyList')) || [];

function renderVocabulary() {
    const vocabularyContainer = document.getElementById('vocabulary-container');
    vocabularyContainer.innerHTML = '';

    vocabularyList.forEach(entry => {
        const wordElement = document.createElement('div');
        wordElement.classList.add('vocabulary-entry');
        wordElement.innerHTML = `
            <h3>${entry.word}</h3>
            <p><strong>Definition:</strong> ${entry.definition}</p>
            <p><strong>Example:</strong> ${entry.example}</p>
            <p><strong>Category:</strong> ${entry.category}</p>
            <p><strong>Difficulty:</strong> ${entry.difficulty}</p>
            <p><strong>Date Added:</strong> ${entry.createdAt}</p>
            <button onclick="editWord('${entry.id}')">Edit</button>
            <button onclick="deleteWord('${entry.id}')">Delete</button>
        `;
        vocabularyContainer.appendChild(wordElement);
    });
}

function addWord() {
    const wordInput = document.getElementById('word-input').value;
    const definitionInput = document.getElementById('definition-input').value;
    const exampleInput = document.getElementById('example-input').value;
    const categoryInput = document.getElementById('category-input').value;
    const difficultyInput = document.getElementById('difficulty-input').value;

    const newEntry = {
        id: Date.now().toString(),
        word: wordInput,
        definition: definitionInput,
        example: exampleInput,
        category: categoryInput,
        difficulty: difficultyInput,
        createdAt: new Date().toISOString().split('T')[0]
    };

    vocabularyList.push(newEntry);
    localStorage.setItem('vocabularyList', JSON.stringify(vocabularyList));
    renderVocabulary();
    clearInputs();
}

function editWord(id) {
    const entry = vocabularyList.find(item => item.id === id);
    if (entry) {
        document.getElementById('word-input').value = entry.word;
        document.getElementById('definition-input').value = entry.definition;
        document.getElementById('example-input').value = entry.example;
        document.getElementById('category-input').value = entry.category;
        document.getElementById('difficulty-input').value = entry.difficulty;
        deleteWord(id);
    }
}

function deleteWord(id) {
    const index = vocabularyList.findIndex(item => item.id === id);
    if (index > -1) {
        vocabularyList.splice(index, 1);
        localStorage.setItem('vocabularyList', JSON.stringify(vocabularyList));
        renderVocabulary();
    }
}

function clearInputs() {
    document.getElementById('word-input').value = '';
    document.getElementById('definition-input').value = '';
    document.getElementById('example-input').value = '';
    document.getElementById('category-input').value = '';
    document.getElementById('difficulty-input').value = '';
}

document.getElementById('add-word-button').addEventListener('click', addWord);
window.addEventListener('load', renderVocabulary);