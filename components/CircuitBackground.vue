<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <svg
      class="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="pcb" x="0" y="0" width="320" height="320" patternUnits="userSpaceOnUse">
          <g stroke="#1E4080" stroke-width="1.5" fill="none">
            <line x1="0"   y1="40"  x2="160" y2="40"/>
            <line x1="200" y1="40"  x2="320" y2="40"/>
            <line x1="0"   y1="120" x2="80"  y2="120"/>
            <line x1="120" y1="120" x2="240" y2="120"/>
            <line x1="0"   y1="200" x2="320" y2="200"/>
            <line x1="0"   y1="280" x2="160" y2="280"/>
            <line x1="240" y1="280" x2="320" y2="280"/>
            <line x1="80"  y1="0"   x2="80"  y2="40"/>
            <line x1="80"  y1="80"  x2="80"  y2="120"/>
            <line x1="80"  y1="160" x2="80"  y2="200"/>
            <line x1="160" y1="40"  x2="160" y2="200"/>
            <line x1="160" y1="240" x2="160" y2="280"/>
            <line x1="240" y1="0"   x2="240" y2="120"/>
            <line x1="240" y1="200" x2="240" y2="280"/>
            <line x1="320" y1="120" x2="320" y2="200"/>
            <polyline points="80,40 80,80 120,80 120,120"/>
            <polyline points="160,200 200,200 200,280"/>
            <polyline points="240,120 280,120 280,200 320,200"/>
          </g>
          <g fill="#1E4080" stroke="none">
            <circle cx="80"  cy="40"  r="4"/>
            <circle cx="160" cy="40"  r="4"/>
            <circle cx="240" cy="40"  r="4"/>
            <circle cx="80"  cy="120" r="4"/>
            <circle cx="160" cy="120" r="4"/>
            <circle cx="240" cy="120" r="4"/>
            <circle cx="80"  cy="200" r="4"/>
            <circle cx="160" cy="200" r="4"/>
            <circle cx="240" cy="200" r="4"/>
            <circle cx="160" cy="280" r="4"/>
            <circle cx="240" cy="280" r="4"/>
          </g>
        </pattern>

        <filter id="pcb-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"   result="wide"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="tight"/>
          <feMerge>
            <feMergeNode in="wide"/>
            <feMergeNode in="tight"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="#0A1628"/>
      <rect width="100%" height="100%" fill="url(#pcb)"/>

      <!-- Animated cyan signal pulses along trace paths -->
      <line x1="-60" y1="40"  x2="3200" y2="40"  class="pcb-signal pcb-s1" filter="url(#pcb-glow)"/>
      <line x1="-60" y1="200" x2="3200" y2="200" class="pcb-signal pcb-s2" filter="url(#pcb-glow)"/>
      <line x1="-60" y1="280" x2="3200" y2="280" class="pcb-signal pcb-s3" filter="url(#pcb-glow)"/>
      <line x1="-60" y1="120" x2="3200" y2="120" class="pcb-signal pcb-s4" filter="url(#pcb-glow)"/>
      <polyline points="-60,40 480,40 480,120 800,120 800,200 3200,200" class="pcb-signal pcb-s5" filter="url(#pcb-glow)"/>
      <polyline points="-60,200 240,200 240,120 560,120 560,40 3200,40" class="pcb-signal pcb-s6" filter="url(#pcb-glow)"/>
    </svg>
  </div>
</template>

<style>
.pcb-signal {
  fill: none;
  stroke: #00E5FF;
  stroke-width: 2;
  opacity: 0;
}

.pcb-s1 { stroke-dasharray: 60 3300; stroke-dashoffset: 60;  animation: pcb-travel 13s linear 0s  infinite; }
.pcb-s2 { stroke-dasharray: 60 3300; stroke-dashoffset: 60;  animation: pcb-travel 10s linear 4s  infinite; }
.pcb-s3 { stroke-dasharray: 60 3300; stroke-dashoffset: 60;  animation: pcb-travel 16s linear 2s  infinite; }
.pcb-s4 { stroke-dasharray: 60 3300; stroke-dashoffset: 60;  animation: pcb-travel 11s linear 7s  infinite; }
.pcb-s5 { stroke-dasharray: 60 3500; stroke-dashoffset: 60;  animation: pcb-travel 18s linear 5s  infinite; }
.pcb-s6 { stroke-dasharray: 60 3400; stroke-dashoffset: 60;  animation: pcb-travel 14s linear 9s  infinite; }

@keyframes pcb-travel {
  0%   { stroke-dashoffset:  60; opacity: 0; }
  5%   { opacity: 1; }
  90%  { opacity: 1; }
  100% { stroke-dashoffset: -3400; opacity: 0; }
}
</style>
