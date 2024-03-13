let currentDate;

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function renderCalendar() {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro"
    ];

    const calendarContainer = document.getElementById("calendar-container");

    const calendarHTML = `
        <div id="calendar-header">
            <button onclick="prevMonth()">&lt;</button>
            <h2>${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h2>
            <button onclick="nextMonth()">&gt;</button>
        </div>
        <div id="calendar-days">
            <div class="header">Dom</div>
            <div class="header">Seg</div>
            <div class="header">Ter</div>
            <div class="header">Qua</div>
            <div class="header">Qui</div>
            <div class="header">Sex</div>
            <div class="header">Sáb</div>
            ${generateDaysHTML(daysInMonth, firstDayOfMonth)}
        </div>
        <div id="calendar-footer">
            <p>Sabrina © ${currentDate.getFullYear()}</p>
        </div>
    `;

    calendarContainer.innerHTML = calendarHTML;
    colorizeWeeks(firstDayOfMonth);
}

function colorizeWeeks(firstDayOfMonth) {
    const daysContainer = document.getElementById("calendar-days");
    const days = daysContainer.getElementsByClassName("day");

    let currentColor = "turquoise"; // Começar com azul turquesa
    let lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDay();

    // Ajuste para começar a colorização a partir do último dia do mês anterior
    let startDay = (firstDayOfMonth === 0) ? 6 : (firstDayOfMonth - 1);

    for (let i = 0; i < days.length; i++) {
        days[i].style.backgroundColor = currentColor;

        if ((i + 1 + startDay) % 7 === 0) {
            // Avançar para a próxima cor após cada semana completa
            currentColor = (currentColor === "turquoise") ? "lightpink" : "turquoise";
        }
    }
}

function generateDaysHTML(daysInMonth, firstDayOfMonth) {
    let dayHTML = "";
    let dayCount = 1;
    const today = new Date();

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || dayCount > daysInMonth) {
                dayHTML += `<div class="empty-day"></div>`;
            } else {
                // Adiciona a classe 'current-day' se o dia for o dia atual
                const isCurrentDay = today.getDate() === dayCount && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
                dayHTML += `<div class="day${isCurrentDay ? ' current-day' : ''}">${dayCount}</div>`;
                dayCount++;
            }
        }
    }

    return dayHTML;
}


document.addEventListener("DOMContentLoaded", function () {
    currentDate = new Date();
    renderCalendar();
});
