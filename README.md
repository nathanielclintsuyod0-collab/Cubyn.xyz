<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CubynSMP Store</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white font-sans">

<!-- NAVBAR -->
<nav class="flex justify-between items-center p-4 bg-gray-900 sticky top-0 z-50">
  <h1 class="text-2xl font-bold text-blue-400">CubynSMP</h1>
  <div class="space-x-4 text-sm">
    <a href="#store">Store</a>
    <a href="#leaderboard">Leaderboard</a>
    <a href="#about">About</a>
  </div>
</nav>

<!-- HERO -->
<section class="text-center py-16 px-4">
  <h2 class="text-4xl font-bold text-blue-400">CubynSMP</h2>
  <p class="text-gray-400 mt-2">Survival • Economy • Duels</p>

  <div class="mt-6 flex flex-col gap-3 items-center">
    <button onclick="copyIP()" class="bg-blue-500 px-6 py-2 rounded-xl">Copy Server IP</button>
    <button onclick="copyDiscord()" class="bg-purple-500 px-6 py-2 rounded-xl">Join Discord</button>
    <p id="status" class="text-green-400 text-sm"></p>
  </div>

  <p class="mt-4 text-yellow-400">🟢 Players Online: <span id="players">Loading...</span></p>
</section>

<!-- STORE -->
<section id="store" class="py-10 px-4">
  <h3 class="text-2xl font-bold text-center mb-6">Store</h3>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

    <!-- CARD TEMPLATE -->
    <script>
      const ranks = [
        {name:'VIP', price:50, color:'yellow'},
        {name:'MVP', price:100, color:'green'},
        {name:'PRO', price:150, color:'orange'},
        {name:'ELITE', price:200, color:'red'},
        {name:'LEGEND', price:400, color:'purple'}
      ];

      document.write(ranks.map(r => `
        <div class="bg-gray-900 p-6 rounded-2xl text-center transform hover:scale-105 transition">
          <h4 class="text-xl font-bold text-${r.color}-400">${r.name}</h4>
          <p class="text-gray-400">Rank perks included</p>
          <p class="text-2xl mt-2">₱${r.price}</p>
          <button onclick="buy('${r.name}', ${r.price})" class="mt-4 bg-${r.color}-500 px-4 py-2 rounded-xl">Buy</button>
        </div>
      `).join(''));
    </script>

  </div>
</section>

<!-- LEADERBOARD -->
<section id="leaderboard" class="py-10 px-4 bg-gray-900">
  <h3 class="text-2xl font-bold text-center mb-6">Leaderboard</h3>

  <div class="max-w-xl mx-auto space-y-2" id="lb"></div>
</section>

<!-- ABOUT -->
<section id="about" class="py-10 px-4 text-center">
  <h3 class="text-2xl font-bold mb-4">About</h3>
  <p class="text-gray-400 max-w-xl mx-auto">CubynSMP is a competitive Minecraft server with economy, duels, and ranks. Climb the leaderboard and become the best!</p>
</section>

<!-- CHECKOUT MODAL -->
<div id="checkout" class="hidden fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
  <div class="bg-gray-900 p-6 rounded-2xl text-center w-80">
    <h3 id="itemName" class="text-xl font-bold"></h3>
    <p id="itemPrice" class="text-gray-400"></p>
    <p class="mt-4 text-sm">Send payment via GCash:</p>
    <p class="text-green-400">09XXXXXXXXX</p>
    <button onclick="closeCheckout()" class="mt-4 bg-red-500 px-4 py-2 rounded">Close</button>
  </div>
</div>

<!-- FOOTER -->
<footer class="text-center py-6 text-gray-500">
  © 2026 CubynSMP
</footer>

<!-- SCRIPTS -->
<script>
// COPY BUTTONS
function copyIP(){
  navigator.clipboard.writeText("play.cubynsmp.com");
  document.getElementById("status").innerText = "IP copied!";
}
function copyDiscord(){
  navigator.clipboard.writeText("https://discord.gg/yourserver");
  document.getElementById("status").innerText = "Discord link copied!";
}

// CHECKOUT
function buy(name, price){
  document.getElementById("checkout").classList.remove("hidden");
  document.getElementById("itemName").innerText = name;
  document.getElementById("itemPrice").innerText = "₱" + price;
}
function closeCheckout(){
  document.getElementById("checkout").classList.add("hidden");
}

// FAKE PLAYER COUNT (replace with API later)
setInterval(()=>{
  document.getElementById("players").innerText = Math.floor(Math.random()*100);
},2000);

// LEADERBOARD SAMPLE
const players = [
  {name:"Player1", elo:1200, coins:5000, kills:30},
  {name:"Player2", elo:1100, coins:4200, kills:25},
  {name:"Player3", elo:1000, coins:3000, kills:20}
];

const lb = document.getElementById("lb");
players.sort((a,b)=>b.elo-a.elo).forEach((p,i)=>{
  lb.innerHTML += `
    <div class="bg-gray-800 p-3 rounded flex justify-between">
      <span>#${i+1} ${p.name}</span>
      <span>ELO: ${p.elo} | 💰 ${p.coins} | ⚔ ${p.kills}</span>
    </div>
  `;
});
</script>

</body>
</html>
