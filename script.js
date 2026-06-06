/* LOADER */

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader =
document.getElementById("loader");

if(loader){

loader.style.display="none";

}

},2500);

});

/* MOBILE MENU */

const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.getElementById("sidebar");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

sidebar.classList.toggle("active");

});

}

/* PROFILE SYSTEM */

const saveProfileBtn =
document.getElementById("saveProfile");

const nameInput =
document.getElementById("nameInput");

const bioInput =
document.getElementById("bioInput");

const displayName =
document.getElementById("displayName");

const bioPreview =
document.getElementById("bioPreview");

function loadProfile(){

const profile =
JSON.parse(
localStorage.getItem(
"vk_profile"
)
);

if(!profile) return;

displayName.textContent =
profile.name;

bioPreview.textContent =
profile.bio;

nameInput.value =
profile.name;

bioInput.value =
profile.bio;

}

function saveProfile(){

const profile = {

name:
nameInput.value || "Prime User",

bio:
bioInput.value || "Creator"

};

localStorage.setItem(
"vk_profile",
JSON.stringify(profile)
);

displayName.textContent =
profile.name;

bioPreview.textContent =
profile.bio;

showNotification(
"Profile Saved ⚡"
);

}

if(saveProfileBtn){

saveProfileBtn.addEventListener(
"click",
saveProfile
);

}

loadProfile();

/* AI CHAT */

const aiInput =
document.getElementById("aiInput");

const sendAI =
document.getElementById("sendAI");

const chatArea =
document.getElementById("chatArea");

const aiReplies = [

"PrimeVerse online.",
"Interesting question.",
"Analyzing universe...",
"Future detected.",
"Creator mode activated.",
"Legendary idea.",
"Keep building.",
"Mission accepted."

];

function addMessage(text,type){

const msg =
document.createElement("div");

msg.className =
type === "user"
? "user-msg"
: "bot-msg";

msg.innerText = text;

chatArea.appendChild(msg);

chatArea.scrollTop =
chatArea.scrollHeight;

}

function sendMessage(){

const text =
aiInput.value.trim();

if(!text) return;

addMessage(text,"user");

aiInput.value = "";

setTimeout(()=>{

const randomReply =

aiReplies[
Math.floor(
Math.random() *
aiReplies.length
)
];

addMessage(
randomReply,
"bot"
);

},700);

}

if(sendAI){

sendAI.addEventListener(
"click",
sendMessage
);

}

if(aiInput){

aiInput.addEventListener(
"keypress",
e=>{

if(e.key==="Enter"){

sendMessage();

}

});

}

/* THEME SYSTEM */

const themeButtons =
document.querySelectorAll(
"[data-theme]"
);

function applyTheme(theme){

document.body.classList.remove(
"theme-orange",
"theme-violet",
"theme-shadow"
);

if(theme !== "cyan"){

document.body.classList.add(
"theme-" + theme
);

}

localStorage.setItem(
"vk_theme",
theme
);

showNotification(
"Theme Updated 🎨"
);

}

themeButtons.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

applyTheme(
btn.dataset.theme
);

}
);

});

const savedTheme =
localStorage.getItem(
"vk_theme"
);

if(savedTheme){

applyTheme(savedTheme);

}

/* SETTINGS BUTTON */

const toggleTheme =
document.getElementById(
"toggleTheme"
);

if(toggleTheme){

toggleTheme.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"theme-shadow"
);

showNotification(
"Shadow Mode Changed"
);

}
);

}

/* RESET */

const resetData =
document.getElementById(
"resetData"
);

if(resetData){

resetData.addEventListener(
"click",
()=>{

const confirmReset =
confirm(
"Delete all PrimeVerse data?"
);

if(confirmReset){

localStorage.clear();

location.reload();

}

}
);

}

/* NOTIFICATION */

function showNotification(text){

const notify =
document.createElement("div");

notify.innerText = text;

notify.style.position="fixed";
notify.style.top="25px";
notify.style.right="25px";

notify.style.padding="16px 22px";

notify.style.borderRadius="16px";

notify.style.background=
"rgba(0,245,255,.15)";

notify.style.border=
"1px solid rgba(0,245,255,.4)";

notify.style.backdropFilter=
"blur(10px)";

notify.style.zIndex="999999";

notify.style.color="white";

document.body.appendChild(
notify
);

setTimeout(()=>{

notify.remove();

},2500);

}

/* DASHBOARD COUNTER */

function animateCounter(
element,
target
){

let current = 0;

const speed =
target / 80;

const interval =
setInterval(()=>{

current += speed;

if(current >= target){

current = target;

clearInterval(interval);

}

element.innerText =
Math.floor(current)
.toLocaleString();

},20);

}

const xpValue =
document.getElementById(
"xpValue"
);

if(xpValue){

animateCounter(
xpValue,
12450
);

}

/* MARKETPLACE */

const marketCards =
document.querySelectorAll(
".market-card"
);

marketCards.forEach(card=>{

card.addEventListener(
"click",
()=>{

showNotification(
card.innerText +
" Added To Wishlist"
);

}
);

});

/* HERO BUTTON */

const heroButton =
document.querySelector(
".primary-btn"
);

if(heroButton){

heroButton.addEventListener(
"click",
()=>{

document
.getElementById(
"dashboard"
)
.scrollIntoView({

behavior:"smooth"

});

}
);

}

/* WELCOME SYSTEM */

const username = localStorage.getItem("vk_username");

if(!username){

setTimeout(()=>{

const name = prompt(
"Welcome To VK.PrimeVerse ⚡\nEnter Your Name:"
);

if(name){

localStorage.setItem(
"vk_username",
name
);

showNotification(
"Welcome " + name + " 🚀"
);

}

},1000);

}

/* DAILY REWARD */

function claimDailyReward(){

const lastReward =
localStorage.getItem(
"vk_daily_reward"
);

const today =
new Date().toDateString();

if(lastReward !== today){

let xp =
parseInt(
localStorage.getItem(
"vk_xp"
) || 0
);

xp += 500;

localStorage.setItem(
"vk_xp",
xp
);

localStorage.setItem(
"vk_daily_reward",
today
);

showNotification(
"+500 XP Daily Reward 🎁"
);

}

}

claimDailyReward();

/* XP SYSTEM */

let xp =
parseInt(
localStorage.getItem(
"vk_xp"
) || 12450
);

function updateXP(){

const xpElement =
document.getElementById(
"xpValue"
);

if(xpElement){

xpElement.innerText =
xp.toLocaleString();

}

const level =
Math.floor(
xp / 1000
);

updateRank(level);

}

function addXP(amount){

xp += amount;

localStorage.setItem(
"vk_xp",
xp
);

updateXP();

showNotification(
"+" + amount + " XP"
);

}

/* RANK SYSTEM */

function updateRank(level){

const rankCards =
document.querySelectorAll(
".rank-card h3"
);

let rank = "Rookie";

if(level >= 5)
rank = "Explorer";

if(level >= 10)
rank = "Creator";

if(level >= 20)
rank = "Elite";

if(level >= 40)
rank = "Legend";

rankCards.forEach(card=>{

card.innerText =
rank;

});

}

/* ACHIEVEMENTS */

const achievements = [

"First Login",
"Profile Created",
"Theme Master",
"Community Explorer",
"Gaming Champion"

];

function unlockAchievement(name){

let unlocked =
JSON.parse(
localStorage.getItem(
"vk_achievements"
) || "[]"
);

if(
!unlocked.includes(name)
){

unlocked.push(name);

localStorage.setItem(
"vk_achievements",
JSON.stringify(unlocked)
);

showNotification(
"🏆 Achievement: " +
name
);

}

}

/* PROFILE ACHIEVEMENT */

if(saveProfileBtn){

saveProfileBtn.addEventListener(
"click",
()=>{

unlockAchievement(
"Profile Created"
);

addXP(200);

}
);

}

/* TEMPLATE ACHIEVEMENT */

themeButtons.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

unlockAchievement(
"Theme Master"
);

addXP(100);

});

});

/* COMMUNITY FEED */

const communitySection =
document.getElementById(
"community"
);

if(communitySection){

const feed =
document.createElement("div");

feed.style.marginTop="30px";

feed.innerHTML = `

<div class="community-card">
🔥 New Creator Joined PrimeVerse
</div>

<div class="community-card">
⚡ Gaming Tournament Starts Soon
</div>

<div class="community-card">
🌌 Galaxy Drift Theme Trending
</div>

`;

communitySection.appendChild(
feed
);

}

/* MUSIC PLAYER */

const musicPlayer =
document.getElementById(
"musicPlayer"
);

if(musicPlayer){

musicPlayer.volume = 0.4;

}

/* AVATAR RANDOMIZER */

const avatarPreview =
document.getElementById(
"avatarPreview"
);

if(avatarPreview){

avatarPreview.addEventListener(
"click",
()=>{

const icons = [

"VK",
"⚡",
"🎮",
"🚀",
"🌌",
"👑",
"🔥"

];

avatarPreview.innerText =

icons[
Math.floor(
Math.random() *
icons.length
)
];

addXP(50);

}
);

}

/* MARKET XP */

marketCards.forEach(card=>{

card.addEventListener(
"click",
()=>{

addXP(75);

}
);

});

/* SCROLL REVEAL */

const observer =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform=
"translateY(0px)";

}

});

},

{
threshold:0.1
}

);

document
.querySelectorAll(
".dash-card,.community-card,.game-card,.template-card,.market-card"
)
.forEach(card=>{

card.style.opacity=0;

card.style.transform=
"translateY(40px)";

card.style.transition=
".7s ease";

observer.observe(card);

});

/* CYBER CLOCK */

const cyberClock =
document.createElement("div");

cyberClock.style.position=
"fixed";

cyberClock.style.bottom=
"20px";

cyberClock.style.right=
"20px";

cyberClock.style.padding=
"12px 18px";

cyberClock.style.borderRadius=
"16px";

cyberClock.style.background=
"rgba(0,0,0,.4)";

cyberClock.style.backdropFilter=
"blur(10px)";

cyberClock.style.border=
"1px solid rgba(0,245,255,.2)";

cyberClock.style.zIndex=
"9999";

document.body.appendChild(
cyberClock
);

setInterval(()=>{

const now =
new Date();

cyberClock.innerText =

now.toLocaleTimeString();

},1000);

/* FIRST LOGIN */

unlockAchievement(
"First Login"
);

updateXP();

console.log(
"⚡ VK.PrimeVerse Online"
);

/* OMNIXORACORE ENTRY SYSTEM */

const entryScreen =
document.getElementById("entryScreen");

const enterButton =
document.getElementById("enterUniverse");

const mainContent =
document.getElementById("mainContent");

if(enterButton){

enterButton.addEventListener("click",()=>{

const name =
document.getElementById("entryName").value;

const age =
document.getElementById("entryAge").value;

const country =
document.getElementById("entryCountry").value;

const source =
document.getElementById("entrySource").value;

if(
!name ||
!age ||
!country ||
!source
){

alert(
"Please fill all fields."
);

return;

}

localStorage.setItem(
"omnix_user",
JSON.stringify({

name,
age,
country,
source

})
);

const portalScreen =
document.getElementById(
"portalScreen"
);

const flashScreen =
document.getElementById(
"flashScreen"
);

document.body.classList.add(
"shake-screen"
);

setTimeout(()=>{

document.body.classList.remove(
"shake-screen"
);

},350);

flashScreen.classList.add(
"flash-active"
);

setTimeout(()=>{

flashScreen.classList.remove(
"flash-active"
);

},800);

portalScreen.style.display =
"flex";

const line1 =
document.getElementById(
"bootLine1"
);

const line2 =
document.getElementById(
"bootLine2"
);

const line3 =
document.getElementById(
"bootLine3"
);

const line4 =
document.getElementById(
"bootLine4"
);

const line5 =
document.getElementById(
"bootLine5"
);

setTimeout(()=>{

typeLine(
line1,
"> Connecting Neural Core..."
);

},200);

setTimeout(()=>{

typeLine(
line2,
"> Loading Quantum Network..."
);

},900);

setTimeout(()=>{

typeLine(
line3,
"> Synchronizing Reality..."
);

},1600);

setTimeout(()=>{

typeLine(
line4,
"> Verifying Identity..."
);

},2300);

setTimeout(()=>{

typeLine(
line5,
"> Access Granted ✓"
);

},3000);

setTimeout(()=>{

portalScreen.style.display =
"none";

entryScreen.style.display =
"none";

welcomeScreen.style.display =
"flex";

welcomeUser.innerText =
name;

setTimeout(()=>{

welcomeScreen.style.display =
"none";

mainContent.style.display =
"block";

},2000);

},5000);

});

}

/* WELCOME BACK SYSTEM */

const savedUser =
JSON.parse(
localStorage.getItem(
"omnix_user"
)
);

const welcomeScreen =
document.getElementById(
"welcomeScreen"
);

const welcomeUser =
document.getElementById(
"welcomeUser"
);

if(savedUser){

entryScreen.style.display =
"none";

welcomeScreen.style.display =
"flex";

welcomeUser.innerText =
savedUser.name;

setTimeout(()=>{

welcomeScreen.style.display =
"none";

mainContent.style.display =
"block";

},2500);

}

/* BOOT SEQUENCE */

function typeLine(
element,
text,
speed = 40
){

let index = 0;

element.innerHTML = "";

const typing = setInterval(()=>{

element.innerHTML += text[index];

index++;

if(index >= text.length){

clearInterval(typing);

}

},speed);

}

/* PORTAL PARTICLES */

function createPortalParticle(){

const container =
document.getElementById(
"portalParticles"
);

if(!container) return;

const particle =
document.createElement("div");

particle.classList.add(
"portal-particle"
);

particle.style.left = "50%";
particle.style.top = "50%";

const tx =
(Math.random()*300)-150;

const ty =
(Math.random()*300)-150;

particle.style.setProperty(
"--tx",
tx + "px"
);

particle.style.setProperty(
"--ty",
ty + "px"
);

container.appendChild(
particle
);

setTimeout(()=>{

particle.remove();

},2000);

}

setInterval(()=>{

const portal =
document.getElementById(
"portalScreen"
);

if(
portal &&
portal.style.display === "flex"
){

for(let i=0;i<3;i++){

createPortalParticle();

}

}

},150);

/* LIVE CLOCK */

const liveClock =
document.getElementById(
"liveClock"
);

if(liveClock){

setInterval(()=>{

liveClock.innerText =
new Date().toLocaleTimeString();

},1000);

}

/* LIVE NOTIFICATIONS */

const notifications = [

"⚡ Neural Core Stable",
"🌌 Quantum Link Established",
"🤖 Prime AI Monitoring",
"🔒 Security Layer Active",
"🚀 System Performance Optimal",
"💎 OmnixoraCore Online"

];

function addLiveNotification(){

const center =
document.getElementById(
"notificationCenter"
);

if(!center) return;

const item =
document.createElement("div");

item.className =
"notification-item";

item.innerText =

notifications[
Math.floor(
Math.random() *
notifications.length
)
];

center.prepend(item);

if(center.children.length > 4){

center.lastElementChild.remove();

}

}

setInterval(
addLiveNotification,
5000
);

/* SYSTEM METRICS */

function randomMetric(){

const cpu =
Math.floor(
Math.random()*40 + 50
);

const memory =
Math.floor(
Math.random()*35 + 55
);

const ai =
Math.floor(
Math.random()*20 + 80
);

document.getElementById(
"cpuBar"
).style.width =
cpu + "%";

document.getElementById(
"cpuText"
).innerText =
cpu + "%";

document.getElementById(
"memoryBar"
).style.width =
memory + "%";

document.getElementById(
"memoryText"
).innerText =
memory + "%";

document.getElementById(
"aiBar"
).style.width =
ai + "%";

document.getElementById(
"aiText"
).innerText =
ai + "%";

}

setInterval(
randomMetric,
3000
);

randomMetric();

/* TERMINAL SYSTEM */

const terminalInput =
document.getElementById(
"terminalCommand"
);

const terminalOutput =
document.getElementById(
"terminalOutput"
);

function addTerminalLine(text){

const line =
document.createElement("div");

line.className =
"terminal-line";

line.innerText = text;

terminalOutput.appendChild(
line
);

terminalOutput.scrollTop =
terminalOutput.scrollHeight;

}

function runCommand(cmd){

switch(cmd){

case "help":

addTerminalLine(
"help"
);

addTerminalLine(
"status"
);

addTerminalLine(
"profile"
);

addTerminalLine(
"system scan"
);

addTerminalLine(
"launch ai"
);

addTerminalLine(
"open dashboard"
);

addTerminalLine(
"open profile"
);

addTerminalLine(
"theme cyan"
);

addTerminalLine(
"theme violet"
);

addTerminalLine(
"theme orange"
);

addTerminalLine(
"clear"
);

break;

case "status":

addTerminalLine(
"System Status: ONLINE"
);

break;

case "profile":

addTerminalLine(
"User: " +
(localStorage.getItem("vk_username") || "Guest")
);

break;

case "ai":

addTerminalLine(
"Prime AI Active"
);

break;

case "clear":

terminalOutput.innerHTML = "";

break;

case "theme cyan":

applyTheme("cyan");

addTerminalLine(
"Theme switched to CYAN"
);

break;

case "theme violet":

applyTheme("violet");

addTerminalLine(
"Theme switched to VIOLET"
);

break;

case "theme orange":

applyTheme("orange");

addTerminalLine(
"Theme switched to ORANGE"
);

break;

case "open dashboard":

document
.getElementById("dashboard")
.scrollIntoView({
behavior:"smooth"
});

addTerminalLine(
"Opening Dashboard..."
);

break;

case "open profile":

document
.getElementById("profiles")
.scrollIntoView({
behavior:"smooth"
});

addTerminalLine(
"Opening Profile..."
);

break;

case "launch ai":

document
.getElementById("ai")
.scrollIntoView({
behavior:"smooth"
});

addTerminalLine(
"Launching AI Core..."
);

break;

case "system scan":

addTerminalLine(
"Scanning System..."
);

setTimeout(()=>{

addTerminalLine(
"Neural Core: Stable"
);

},500);

setTimeout(()=>{

addTerminalLine(
"Security Layer: Active"
);

},1000);

setTimeout(()=>{

addTerminalLine(
"AI Core: Online"
);

},1500);

setTimeout(()=>{

addTerminalLine(
"Scan Complete ✓"
);

},2000);

break;

default:

addTerminalLine(
"Unknown Command"
);

}

}

if(terminalInput){

terminalInput.addEventListener(
"keypress",
e=>{

if(e.key==="Enter"){

const cmd =
terminalInput.value
.toLowerCase()
.trim();

addTerminalLine(
"> " + cmd
);

runCommand(cmd);

terminalInput.value = "";

}

}
);

}