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


// calendar functioning 
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
            }

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
