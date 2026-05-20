// app.js

const vocabularyList = JSON.parse(localStorage.getItem('vocabularyList')) || [];
const BUBBLE_LIMIT = 10;
let selectedWordId = null;

function renderVocabulary() {
    const vocabularyContainer = document.getElementById('vocabulary-container');
    if (vocabularyContainer) {
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
}

function renderBubbles() {
    const bubblesContainer = document.getElementById('word-bubbles');
    const moreButton = document.getElementById('more-button');
    
    if (!bubblesContainer) return;
    
    bubblesContainer.innerHTML = '';
    
    // Show only the first BUBBLE_LIMIT words
    const displayWords = vocabularyList.slice(0, BUBBLE_LIMIT);
    
    displayWords.forEach(entry => {
        const bubble = document.createElement('span');
        bubble.classList.add('word-bubble');
        bubble.textContent = entry.word;
        bubble.title = entry.definition;
        bubble.addEventListener('click', () => {
            // Scroll to or highlight the word in the list if on same page
            const wordItems = document.querySelectorAll('.word-list li');
            wordItems.forEach(item => {
                if (item.textContent.includes(entry.word)) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    item.style.backgroundColor = '#fff3cd';
                    setTimeout(() => {
                        item.style.backgroundColor = '';
                    }, 2000);
                }
            });
        });
        bubblesContainer.appendChild(bubble);
    });
    
    // Show more button only if there are more than BUBBLE_LIMIT words
    if (moreButton) {
        moreButton.style.display = vocabularyList.length > BUBBLE_LIMIT ? 'inline-block' : 'none';
    }
}

function addWord(event) {
    event.preventDefault();
    
    const wordInput = document.getElementById('word').value;
    const definitionInput = document.getElementById('definition').value;
    const exampleInput = document.getElementById('example').value;
    const categoryInput = document.getElementById('category').value;
    const difficultyInput = document.getElementById('difficulty').value;

    if (!wordInput || !definitionInput || !exampleInput) {
        alert('Please fill in all required fields');
        return;
    }

    const newEntry = {
        id: Date.now().toString(),
        word: wordInput,
        definition: definitionInput,
        example: exampleInput,
        category: categoryInput || 'Uncategorized',
        difficulty: difficultyInput || 'Medium',
        createdAt: new Date().toISOString().split('T')[0]
    };

    vocabularyList.unshift(newEntry);
    localStorage.setItem('vocabularyList', JSON.stringify(vocabularyList));
    
    renderBubbles();
    renderWordList();
    clearInputs();
}

function renderWordList() {
    const wordListContainer = document.getElementById('word-list');
    if (!wordListContainer) return;
    
    wordListContainer.innerHTML = '';

    vocabularyList.forEach(entry => {
        const li = document.createElement('li');
        li.classList.add('word-item-container');
        li.innerHTML = `
            <div class="word-item" onclick="toggleWordDetails('${entry.id}')">
                <div class="word-header">
                    <strong>${entry.word}</strong>
                </div>
                <div class="word-details" id="details-${entry.id}" style="display: none;">
                    <p><strong>Definition:</strong> ${entry.definition}</p>
                    <p><strong>Category:</strong> ${entry.category}</p>
                    <p><strong>Difficulty:</strong> ${entry.difficulty}</p>
                </div>
                <button onclick="deleteWord('${entry.id}')" style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);">Delete</button>
            </div>
        `;
        wordListContainer.appendChild(li);
    });
}

function toggleWordDetails(id) {
    const detailsElement = document.getElementById(`details-${id}`);
    
    // Hide all other open details
    document.querySelectorAll('.word-details').forEach(el => {
        if (el.id !== `details-${id}`) {
            el.style.display = 'none';
        }
    });
    
    // Toggle current details
    if (detailsElement) {
        detailsElement.style.display = detailsElement.style.display === 'none' ? 'block' : 'none';
    }
    
    selectedWordId = detailsElement.style.display === 'block' ? id : null;
}

function deleteWord(id) {
    if (confirm('Are you sure you want to delete this word?')) {
        const index = vocabularyList.findIndex(item => item.id === id);
        if (index > -1) {
            vocabularyList.splice(index, 1);
            localStorage.setItem('vocabularyList', JSON.stringify(vocabularyList));
            renderBubbles();
            renderWordList();
        }
    }
}

function clearInputs() {
    document.getElementById('word').value = '';
    document.getElementById('definition').value = '';
    document.getElementById('example').value = '';
    document.getElementById('category').value = '';
    document.getElementById('difficulty').value = '';
}

function initializeAllWordsPage() {
    const container = document.getElementById('all-words-content');
    if (!container) return;
    
    if (vocabularyList.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No words added yet. Start adding words from the main page!</p></div>';
        return;
    }
    
    const grid = document.createElement('div');
    grid.classList.add('words-grid');
    
    vocabularyList.forEach(entry => {
        const card = document.createElement('div');
        card.classList.add('word-card');
        card.innerHTML = `
            <h3>${entry.word}</h3>
            <p><strong>Definition:</strong> ${entry.definition}</p>
            <p><strong>Example:</strong> ${entry.example}</p>
            <p><strong>Category:</strong> ${entry.category}</p>
            <p><strong>Difficulty:</strong> ${entry.difficulty}</p>
            <p><strong>Date Added:</strong> ${entry.createdAt}</p>
            <button onclick="deleteWordFromAllWords('${entry.id}')" style="margin-top: 10px; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 6px 12px; font-size: 0.9em;">D[...]
        `;
        grid.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
}

function deleteWordFromAllWords(id) {
    if (confirm('Are you sure you want to delete this word?')) {
        const index = vocabularyList.findIndex(item => item.id === id);
        if (index > -1) {
            vocabularyList.splice(index, 1);
            localStorage.setItem('vocabularyList', JSON.stringify(vocabularyList));
            initializeAllWordsPage();
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const wordForm = document.getElementById('word-form');
    if (wordForm) {
        wordForm.addEventListener('submit', addWord);
    }
    
    renderBubbles();
    renderWordList();
    initializeAllWordsPage();
});
