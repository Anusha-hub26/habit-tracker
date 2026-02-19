const calendar = document.getElementById("calendar");
const totalDaysElement = document.getElementById("totalDays");
const streakElement = document.getElementById("streak");

const daysInYear = 365;
let completedDays = JSON.parse(localStorage.getItem("habitData")) || {};

// Generate 365 days
for (let i = 1; i <= daysInYear; i++) {
    const day = document.createElement("div");
    day.classList.add("day");

    if (completedDays[i]) {
        day.classList.add("completed");
    }

    day.addEventListener("click", () => {
        if (completedDays[i]) {
            delete completedDays[i];
            day.classList.remove("completed");
        } else {
            completedDays[i] = true;
            day.classList.add("completed");
        }

        localStorage.setItem("habitData", JSON.stringify(completedDays));
        updateInsights();
    });

    calendar.appendChild(day);
}

function updateInsights() {
    const totalCompleted = Object.keys(completedDays).length;
    totalDaysElement.textContent = totalCompleted;

    // Calculate simple streak
    let streak = 0;
    for (let i = daysInYear; i >= 1; i--) {
        if (completedDays[i]) {
            streak++;
        } else {
            break;
        }
    }

    streakElement.textContent = streak;
}

updateInsights();
