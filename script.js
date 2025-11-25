(function(){
// Az együtt kezdete (év, hónap-1, nap)
const startDate = new Date(2020, 7, 1, 0, 0, 0); // augusztus 1 = month index 7


const elYears = document.getElementById('years');
const elMonths = document.getElementById('months');
const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const toggleBtn = document.getElementById('toggleFormat');
const shareBtn = document.getElementById('shareBtn');


let detailed = false;


function update() {
const now = new Date();


// számoljuk ki év/hónap/nap különbséget pontosan
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
// visszalépünk az előző hónap végéhez
const prev = new Date(now.getFullYear(), now.getMonth(), 0); // az előző hónap utolsó napja
days += prev.getDate();
months -= 1;
}


if (months < 0) { months += 12; years -= 1; }


elYears.textContent = years;
elMonths.textContent = months;
elDays.textContent = days;
elHours.textContent = hours;
elMinutes.textContent = minutes;
elSeconds.textContent = seconds;


// ha rövidebb formátum kell, dioglehető
if (!detailed) {
// csak napokra nézve: teljes napok száma
const msPerDay = 24*60*60*1000;
const fullDays = Math.floor((now - startDate) / msPerDay);
elYears.textContent = Math.floor(fullDays/365);
elMonths.textContent = Math.floor((fullDays%365)/30);
elDays.textContent = fullDays;
elHours.textContent = Math.floor((now - startDate) / (1000*60*60));
elMinutes.textContent = Math.floor((now - startDate) / (1000*60));
elSeconds.textContent = Math.floor((now - startDate) / 1000);
}
}


toggleBtn.addEventListener('click', ()=>{
detailed = !detailed;
toggleBtn.textContent = detailed ? 'Részletes nézet (órák, percek)' : 'Rövid nézet (összesen)';
update();
});


shareBtn.addEventListener('click', async ()=>{
const url = location.href;
const text = `Nézd: ${document.title} — ${elYears.textContent} év és ${elDays.textContent} nap óta. (${startDate.toLocaleDateString()})`;
try{
await navigator.clipboard.writeText(text + '\n' + url);
shareBtn.textContent = 'Másolva!';
setTimeout(()=> shareBtn.textContent = 'Megosztás (másolás)', 1800);
}catch(e){
// fallback: prompt
})();