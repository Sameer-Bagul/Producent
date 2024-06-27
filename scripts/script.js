// script.js

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function prev() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
}

function next() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});

function search() {
    const query = document.getElementById('searchbar-input').value;
    const engine = document.getElementById('shrLogo').querySelector('img').getAttribute('data-url');
    window.open(`https://${engine}/search?q=${query}`, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const setCurrentMonthAndYear = () => {
        document.getElementById('current-month').textContent = monthNames[currentMonth];
        document.getElementById('current-year').textContent = currentYear.toString();
    };

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const fetchDayDetails = async (month, day) => {
        const response = await fetch(`https://history.muffinlabs.com/date/${month + 1}/${day}`);
        const data = await response.json();
        return data;
    };

    const showDayDetails = async (month, day) => {
        const dayDetailsContainer = document.getElementById('day-details');
        dayDetailsContainer.innerHTML = 'Loading...';
        
        try {
            const details = await fetchDayDetails(month, day);
    
            // Sort events, births, and deaths by year in descending order
            const sortByYearDesc = (a, b) => b.year - a.year;
            details.data.Events.sort(sortByYearDesc);
            details.data.Births.sort(sortByYearDesc);
            details.data.Deaths.sort(sortByYearDesc);
    
            dayDetailsContainer.innerHTML = `
                <h4>Events on ${monthNames[month]} ${day}</h4>
                <h5>Events:</h5>
                <ul>${details.data.Events.map(event => `<li>${event.year}: ${event.text}</li>`).join('')}</ul>
                <h5>Births:</h5>
                <ul>${details.data.Births.map(birth => `<li>${birth.year}: ${birth.text}</li>`).join('')}</ul>
                <h5>Deaths:</h5>
                <ul>${details.data.Deaths.map(death => `<li>${death.year}: ${death.text}</li>`).join('')}</ul>
            `;
        } catch (error) {
            dayDetailsContainer.innerHTML = 'Failed to load details. Please try again later.';
        }
    };
    

    const populateDays = () => {
        const daysContainer = document.getElementById('calendar-days');
        daysContainer.innerHTML = ''; // Clear previous days

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const prevMonthDays = getDaysInMonth(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);

        // Fill in the days from the previous month
        for (let i = firstDay; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day inactive';
            dayElement.textContent = (prevMonthDays - i + 1).toString();
            daysContainer.appendChild(dayElement);
        }

        // Fill in the current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day.toString();
            
            // Highlight the current day
            if (day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                dayElement.classList.add('current-day');
                showDayDetails(currentMonth, day); // Show details for the current day by default
            }

            dayElement.addEventListener('click', () => showDayDetails(currentMonth, day));

            daysContainer.appendChild(dayElement);
        }

        // Fill in the days from the next month
        const totalDays = firstDay + daysInMonth;
        for (let i = 1; totalDays + i <= 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day inactive';
            dayElement.textContent = i.toString();
            daysContainer.appendChild(dayElement);
        }
    };

    window.prevMonth = () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        updateCalendar();
    };

    window.nextMonth = () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        updateCalendar();
    };

    const updateCalendar = () => {
        setCurrentMonthAndYear();
        populateDays();
    };

    updateCalendar(); // Initial call to display the current month and year
});


// JavaScript code
var url = 'google.com';

// Function to remove active class from all options
function removeActiveClass() {
    document.querySelectorAll('.searchbar .search-option').forEach(val => {
        val.classList.remove('active');
        val.style.color = '#5f6368'; // Reset color
    });
}

document.querySelectorAll('.searchbar .search-option').forEach(val => {
    val.addEventListener('click', () => {
        if (val.classList.contains('download')) {
            downloadFile();
        } else {
            removeActiveClass();
            val.classList.add('active');
            val.style.color = 'orangered'; // Set active color
            url = val.getAttribute('data-url');
        }
    });
});

function search() {
    var query = document.querySelector('#searchbar-input').value;
    var searchUrl = "https://" + url + "/search?q=" + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
}

function downloadFile() {
    // Logic for downloading a file
    var a = document.createElement('a');
    a.href = 'path/to/your/file';
    a.download = 'filename.extension';
    a.click();
}

// Add event listener for the Enter key
document.querySelector('#searchbar-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

// Add click event listener to the search icon
document.querySelector('#search-icon').addEventListener('click', function() {
    search();
});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const bgChangeIcon = document.getElementById('bg-change-icon');
    const bgInput = document.getElementById('bg-input');

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        let theme = 'dark';
        if (document.body.classList.contains('light-theme')) {
            theme = 'light';
        }
        localStorage.setItem('theme', theme);
    });

    bgChangeIcon.addEventListener('click', () => {
        bgInput.click();
    });

    bgInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.body.style.backgroundImage = `url(${e.target.result})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
            };
            reader.readAsDataURL(file);
        }
    });
});
// Ensure DOM content is loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    const bgChangeButton = document.getElementById('bg-change-button');
    const bgInput = document.getElementById('bg-input');
    const body = document.getElementById('main-body');

    bgChangeButton.addEventListener('click', function() {
        bgInput.click();
    });

    bgInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                body.style.backgroundImage = `url(${e.target.result})`;
                body.style.backgroundSize = 'cover'; // Ensure the image covers the entire background
            };
            reader.readAsDataURL(file);
        }
    });
});

// For github

// document.addEventListener('DOMContentLoaded', async function() {
//     const githubUsername = 'Sameer-Bagul'; 
//     const githubUrl = `https://api.github.com/users/${githubUsername}/repos`;

//     try {
//         const response = await fetch(githubUrl);
//         const repos = await response.json();

//         const githubInfoContainer = document.getElementById('github-info');
//         githubInfoContainer.innerHTML = '';

//         repos.forEach(repo => {
//             const repoElement = document.createElement('div');
//             repoElement.classList.add('repo');
//             repoElement.innerHTML = `
//                 <h3>${repo.name}</h3>
//                 <p>${repo.description || 'No description available'}</p>
//                 <p>Language: ${repo.language || 'Unknown'}</p>
//                 <a href="${repo.html_url}" target="_blank">Visit Repository</a>
//             `;
//             githubInfoContainer.appendChild(repoElement);
//         });
//     } catch (error) {
//         console.error('Failed to fetch GitHub repositories:', error);
//         const githubInfoContainer = document.getElementById('github-info');
//         githubInfoContainer.innerHTML = 'Failed to fetch GitHub repositories.';
//     }
// });

document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message) {
        appendMessage('right', message);
        userInput.value = '';

        // Replace with your ChatGPT API call
        fetchChatGPTResponse(message).then(response => {
            appendMessage('left', response);
        });
    }
}

function appendMessage(side, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('li');
    messageElement.className = `message ${side}`;
    messageElement.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchChatGPTResponse(message) {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}

// TODO list
document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');
    const clearAllButton = document.getElementById('clearAll');

    const filters = document.querySelectorAll('.filters span');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    filters.forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelector('span.active').classList.remove('active');
            btn.classList.add('active');
            displayTodos(btn.id);
        });
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const todoItem = {
                text: todoText,
                completed: false
            };
            todos.push(todoItem);
            saveTodos();
            displayTodos(document.querySelector('span.active').id);
            todoInput.value = '';
        }
    }

    function createTodoItem(todo, index) {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', function () {
            todo.completed = !todo.completed;
            saveTodos();
            displayTodos(document.querySelector('span.active').id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function (e) {
            e.stopPropagation();
            todos.splice(index, 1);
            saveTodos();
            displayTodos(document.querySelector('span.active').id);
        });

        li.appendChild(deleteButton);
        return li;
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function displayTodos(filter) {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (filter === 'all') return true;
            if (filter === 'pending') return !todo.completed;
            if (filter === 'completed') return todo.completed;
        });

        filteredTodos.forEach((todo, index) => {
            const todoItem = createTodoItem(todo, index);
            todoList.appendChild(todoItem);
        });
    }

    todoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    clearAllButton.addEventListener('click', function () {
        todos = [];
        saveTodos();
        displayTodos('all');
    });

    displayTodos('all');
});
