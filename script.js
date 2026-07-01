const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userName');
const userAgeInput = document.getElementById('userAge');
const outputSection = document.getElementById('outputSection');
const greetingText = document.getElementById('greetingText');
const ageInMonthsText = document.getElementById('ageInMonthsText');
const ageStatusCard = document.getElementById('ageStatusCard');
const ageStatusText = document.getElementById('ageStatusText');
const quoteContainer = document.getElementById('quoteContainer');
const clearBtn = document.getElementById('clearBtn');

const dailyEncouragements = {
    "Monday": "Fresh week, fresh energy. Set your intentions, clear your desk, and attack your biggest goal first.",
    "Tuesday": "Momentum Tuesday. Yesterday is done; today is where the real progress builds. Keep pushing.",
    "Wednesday": "Mid-week check-in. Look at how far you've come since Monday. You are halfway to the finish line.",
    "Thursday": "Finish strong. The weekend is in sight, but the work you do today defines your progress tomorrow.",
    "Friday": "Focus Friday. Tie up loose ends with pride so you can rest with a completely clear mind.",
    "Saturday": "Recharge and reflect. Growth isn't just about the hustle; it's also about breathing and celebrating small wins.",
    "Sunday": "Reset day. Prepare your mind, protect your peace, and get ready to step into the new week with confidence."
};

function calculateAgeInMonths(ageInYears) {
    return ageInYears * 12;
}

function getCurrentDateTimeString() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return now.toLocaleDateString('en-US', options);
}

function displayMotivationalQuotes() {
    quoteContainer.innerHTML = '';
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIndex = new Date().getDay();

    for (let i = 0; i < 5; i++) {
        const targetDayIndex = (todayIndex + i) % 7;
        const currentDayName = daysOfWeek[targetDayIndex];
        const dailyQuote = dailyEncouragements[currentDayName];
        const quoteBox = document.createElement('div');
        
        if (i === 0) {
            quoteBox.className = "p-4 bg-indigo-50 border-l-4 border-indigo-600 text-indigo-950 rounded-r-lg font-medium shadow-xs text-sm";
            quoteBox.innerHTML = `<span class="font-bold tracking-wide uppercase text-xs text-indigo-600 block mb-1">Today (${currentDayName})</span> "${dailyQuote}"`;
        } else {
            quoteBox.className = "p-3 bg-gray-50 border-l-4 border-gray-300 text-gray-500 rounded-r-lg italic text-xs";
            quoteBox.innerHTML = `<span class="font-semibold text-gray-600 not-italic block mb-0.5">${currentDayName}</span> "${dailyQuote}"`;
        }
        quoteContainer.appendChild(quoteBox);
    }
}

function renderDashboard(name, age) {
    const ageNum = parseInt(age, 10);
    const timeStampString = getCurrentDateTimeString();

    greetingText.innerHTML = `Hello, ${name}! Welcome back.<br><span class="text-xs font-normal text-indigo-400 block mt-1">Dashboard accessed on: ${timeStampString}</span>`;

    const ageInMonths = calculateAgeInMonths(ageNum);
    ageInMonthsText.textContent = `Fun Fact: You have been alive for approximately ${ageInMonths.toLocaleString()} months!`;

    if (ageNum >= 18) {
        ageStatusCard.className = "p-6 rounded-2xl border bg-emerald-50 border-emerald-100 text-emerald-800";
        ageStatusText.textContent = "🔓 Access Granted: You are old enough to view the adult content section.";
    } else {
        ageStatusCard.className = "p-6 rounded-2xl border bg-amber-50 border-amber-100 text-amber-800";
        ageStatusText.textContent = "🔒 Access Restricted: You are too young for adult content.";
    }

    displayMotivationalQuotes();
    outputSection.classList.remove('hidden');
}

function checkExistingSession() {
    const storedName = localStorage.getItem('profileName');
    const storedAge = localStorage.getItem('profileAge');

    if (storedName && storedAge) {
        userNameInput.value = storedName;
        userAgeInput.value = storedAge;
        renderDashboard(storedName, storedAge);
    }
}

userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nameValue = userNameInput.value.trim();
    const ageValue = userAgeInput.value.trim();

    if (nameValue && ageValue) {
        localStorage.setItem('profileName', nameValue);
        localStorage.setItem('profileAge', ageValue);
        renderDashboard(nameValue, ageValue);
    }
});

clearBtn.addEventListener('click', function() {
    localStorage.removeItem('profileName');
    localStorage.removeItem('profileAge');
    userForm.reset();
    outputSection.classList.add('hidden');
});

checkExistingSession();