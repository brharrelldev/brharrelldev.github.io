<template>
  <!-- contain:strict isolates repaints to this element only -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden" style="contain: strict;">
    <svg
      class="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="pcb" x="0" y="0" width="320" height="320" patternUnits="userSpaceOnUse">
          <g stroke="#0E2040" stroke-width="1.5" fill="none">
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
          <g fill="#0E2040" stroke="none">
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
      </defs>

      <rect width="100%" height="100%" fill="#05080F"/>
      <rect width="100%" height="100%" fill="url(#pcb)"/>

    </svg>
  </div>
</template>

