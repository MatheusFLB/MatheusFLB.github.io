function updateClock(){
const el=document.getElementById("clock")
if(!el)return
const formatter=new Intl.DateTimeFormat("pt-BR",{timeZone:"America/Sao_Paulo",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false})
el.textContent=formatter.format(new Date())
}
setInterval(updateClock,1000)
updateClock()


/* =====================================================
   SISTEMA DE SOM RETRÔ PARA HOVER
   ===================================================== */

/*
Usa Web Audio API para gerar um beep curto estilo
interface retrô (tipo Windows 95 / terminal).
Evita depender de arquivos de áudio externos.
*/

let audioCtx = null
let lastHoverSound = 0
const hoverCooldown = 80 // ms

function playHoverSound(){

const now = Date.now()

// evita spam de som
if(now - lastHoverSound < hoverCooldown) return
lastHoverSound = now

if(!audioCtx){
audioCtx = new (window.AudioContext || window.webkitAudioContext)()
}

const osc = audioCtx.createOscillator()
const gain = audioCtx.createGain()

osc.type = "square"
osc.frequency.value = 900

gain.gain.value = 0.05

osc.connect(gain)
gain.connect(audioCtx.destination)

osc.start()
osc.stop(audioCtx.currentTime + 0.05)
}


/* =====================================================
   ATIVA SOM NOS ELEMENTOS INTERATIVOS
   ===================================================== */

function enableHoverSounds(){

const selectors = [
".btn",
".game-card",
".project-card",
".game-link",
"a"
]

const elements = document.querySelectorAll(selectors.join(","))

elements.forEach(el=>{
el.addEventListener("mouseenter", playHoverSound)
})

}

document.addEventListener("DOMContentLoaded", enableHoverSounds)