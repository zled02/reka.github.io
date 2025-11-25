function updateTimer() {
    const startDate = new Date("2020-08-01T00:00:00");
    const now = new Date();
    const diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)) % 12);
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerText =
        `${years} év, ${months} hónap, ${days} nap, `
        + `${hours} óra, ${minutes} perc, ${seconds} másodperc`;
}

updateTimer();
setInterval(updateTimer, 1000);
