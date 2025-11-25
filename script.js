// Nice formatted timer + little UI effects
function plural(label, value) {
    return `${value} ${label}`;
}

function formatElapsed(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes -= 1; }
    if (minutes < 0) { minutes += 60; hours -= 1; }
    if (hours < 0) { hours += 24; days -= 1; }
    if (days < 0) {
        // borrow days from previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth;
        months -= 1;
    }
    if (months < 0) { months += 12; years -= 1; }

    return { years, months, days, hours, minutes, seconds };
}

function updateTimer() {
    const startDate = new Date("2020-08-01T00:00:00");
    const t = formatElapsed(startDate);

    const pieces = [];
    if (t.years) pieces.push(plural('év', t.years));
    if (t.months) pieces.push(plural('hónap', t.months));
    if (t.days) pieces.push(plural('nap', t.days));
    pieces.push(plural('óra', t.hours));
    pieces.push(plural('perc', t.minutes));
    pieces.push(plural('másodperc', t.seconds));

    const el = document.getElementById('timer');
    el.innerText = pieces.join(', ');

    // small 'pop' visual when the second changes
    el.classList.remove('pulse');
    void el.offsetWidth; // reflow
    el.classList.add('pulse');
}

updateTimer();
setInterval(updateTimer, 1000);

// hearts & UI interactions
function spawnHeart(x, y) {
    const h = document.createElement('div');
    h.className = 'mini-heart';
    h.textContent = '❤️';
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    document.body.appendChild(h);

    setTimeout(() => h.remove(), 2000);
}

// love button removed in minimal version — if you add a button later, reattach behavior here

// (minimal site) photos & buttons removed — no extra UI listeners are active

// small accessibility: support keyboard 'Enter' on the love button
// no keyboard handlers needed — love button was removed
