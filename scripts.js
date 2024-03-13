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



function isHoliday(year, month, day) {
    const holidays = [
        // Feriados nacionais
        new Date(year, 0, 1),   // Ano Novo
        new Date(year, 2, 29),  // Paixão de Cristo
        new Date(year, 3, 21),  // Tiradentes
        new Date(year, 4, 1),   // Dia do Trabalhador
        new Date(year, 8, 7),   // Independência do Brasil
        new Date(year, 9, 12),  // Nossa Senhora Aparecida
        new Date(year, 10, 2),  // Finados
        new Date(year, 10, 15), // Proclamação da República
        new Date(year, 11, 25), // Natal

        // Feriados estaduais do Amazonas
        new Date(year, 8, 5),   // Criação do Estado do Amazonas
        new Date(year, 4, 30),  // Corpus Christi (ponto facultativo)
        new Date(year, 10, 20), // Consciência Negra (ponto facultativo)

        // Feriados municipais de Manaus
        new Date(year, 9, 5),   // Elevação do Amazonas à categoria de Província
        new Date(year, 9, 24),  // Aniversário de Manaus
        new Date(year, 10, 13), // Nossa Senhora da Conceição (ponto facultativo)
    ];



    const targetDate = new Date(year, month, day);

    // Verificar se a data é um feriado
    for (const holiday of holidays) {
        if (targetDate.getTime() === holiday.getTime()) {
            return true;
        }
    }

    return false;
}
/*
function generateDaysHTML(daysInMonth, firstDayOfMonth) {
    let dayHTML = "";
    let dayCount = 1;
    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

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
*/

function generateDaysHTML(daysInMonth, firstDayOfMonth) {
    let dayHTML = "";
    let dayCount = 1;
    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOfMonth) || dayCount > daysInMonth) {
                dayHTML += `<div class="empty-day"></div>`;
            } else {
                const isCurrentDay = today.getDate() === dayCount && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
                const isHolidayDay = isHoliday(currentYear, currentMonth, dayCount);

                // Adiciona a classe 'current-day' se o dia for o dia atual
                // Adiciona a classe 'holiday' se o dia for um feriado
                dayHTML += `<div class="day${isCurrentDay ? ' current-day' : ''}${isHolidayDay ? ' holiday' : ''}">${dayCount}</div>`;
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
