<template>
  <div :class="['mascot-container relative inline-flex items-center justify-center select-none', sizeClass, animationClass]">
    <!-- BEAR MASCOT (Kiki Bear - Math / General) -->
    <svg v-if="character === 'bear'" viewBox="0 0 160 160" class="w-full h-full drop-shadow-md">
      <!-- Ears -->
      <circle cx="45" cy="45" r="24" fill="#E6A868" stroke="#5C3A4E" stroke-width="4" />
      <circle cx="45" cy="45" r="14" fill="#FFC9B5" />
      <!-- Stitch on Ear -->
      <path d="M 36 36 L 40 40 M 48 36 L 52 40" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />

      <circle cx="115" cy="45" r="24" fill="#E6A868" stroke="#5C3A4E" stroke-width="4" />
      <circle cx="115" cy="45" r="14" fill="#FFC9B5" />
      <!-- Stitch on Right Ear -->
      <path d="M 106 36 L 110 40 M 118 36 L 122 40" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />

      <!-- Head Body -->
      <ellipse cx="80" cy="88" rx="55" ry="48" fill="#F4BA7B" stroke="#5C3A4E" stroke-width="4" />
      <!-- Felt stitches along head edge -->
      <ellipse cx="80" cy="88" rx="50" ry="43" fill="none" stroke="#D39556" stroke-width="2" stroke-dasharray="4 4" />

      <!-- Glasses (Math special) -->
      <g v-if="character === 'bear'">
        <circle cx="60" cy="82" r="15" fill="rgba(255,255,255,0.7)" stroke="#5C3A4E" stroke-width="3" />
        <circle cx="100" cy="82" r="15" fill="rgba(255,255,255,0.7)" stroke="#5C3A4E" stroke-width="3" />
        <line x1="75" y1="82" x2="85" y2="82" stroke="#5C3A4E" stroke-width="3" />
      </g>

      <!-- Eyes according to emotion -->
      <!-- Happy / Celebrate: Curved happy eyes -->
      <g v-if="emotion === 'happy' || emotion === 'celebrate'">
        <path d="M 54 82 Q 60 75 66 82" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
        <path d="M 94 82 Q 100 75 106 82" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
        <text v-if="emotion === 'celebrate'" x="55" y="70" font-size="14" fill="#FFC94D">✨</text>
        <text v-if="emotion === 'celebrate'" x="95" y="70" font-size="14" fill="#FFC94D">✨</text>
      </g>
      <!-- Empathetic: Gentle tilted warm eyes -->
      <g v-else-if="emotion === 'empathetic'">
        <ellipse cx="60" cy="82" rx="4" ry="5" fill="#5C3A4E" />
        <circle cx="62" cy="80" r="1.5" fill="#FFFFFF" />
        <ellipse cx="100" cy="82" rx="4" ry="5" fill="#5C3A4E" />
        <circle cx="102" cy="80" r="1.5" fill="#FFFFFF" />
        <!-- Soft eyebrows tilted inward -->
        <path d="M 52 74 Q 60 76 68 73" fill="none" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 92 73 Q 100 76 108 74" fill="none" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- Thinking -->
      <g v-else-if="emotion === 'thinking'">
        <circle cx="60" cy="80" r="5" fill="#5C3A4E" />
        <circle cx="62" cy="78" r="1.5" fill="#FFFFFF" />
        <circle cx="100" cy="78" r="5" fill="#5C3A4E" />
        <circle cx="102" cy="76" r="1.5" fill="#FFFFFF" />
        <path d="M 92 72 Q 100 68 108 72" fill="none" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- Neutral / Default -->
      <g v-else>
        <circle cx="60" cy="82" r="5" fill="#5C3A4E" />
        <circle cx="62" cy="80" r="1.5" fill="#FFFFFF" />
        <circle cx="100" cy="82" r="5" fill="#5C3A4E" />
        <circle cx="102" cy="80" r="1.5" fill="#FFFFFF" />
      </g>

      <!-- Snout & Blush -->
      <ellipse cx="80" cy="98" rx="20" ry="14" fill="#FFF2DE" stroke="#5C3A4E" stroke-width="3" />
      <ellipse cx="80" cy="93" rx="7" ry="5" fill="#5C3A4E" />
      <path d="M 80 98 L 80 104 M 74 104 Q 80 108 86 104" fill="none" stroke="#5C3A4E" stroke-width="3" stroke-linecap="round" />

      <!-- Pink Blush Cheeks -->
      <ellipse cx="44" cy="95" rx="9" ry="6" fill="#FF9EC4" opacity="0.8" />
      <ellipse cx="116" cy="95" rx="9" ry="6" fill="#FF9EC4" opacity="0.8" />

      <!-- Bow Tie / Ribbon -->
      <path d="M 68 132 L 80 126 L 92 132 L 80 138 Z" fill="#E85C96" stroke="#5C3A4E" stroke-width="3" />
      <circle cx="80" cy="132" r="4" fill="#FFC94D" stroke="#5C3A4E" stroke-width="2" />
    </svg>

    <!-- RABBIT MASCOT (Kiki Bunny - Memory) -->
    <svg v-else-if="character === 'rabbit'" viewBox="0 0 160 160" class="w-full h-full drop-shadow-md">
      <!-- Tall Bunny Ears -->
      <ellipse cx="55" cy="42" rx="14" ry="36" fill="#FFFFFF" stroke="#5C3A4E" stroke-width="4" transform="rotate(-8 55 42)" />
      <ellipse cx="55" cy="44" rx="8" ry="24" fill="#FFD4E5" transform="rotate(-8 55 44)" />
      <!-- Stitch on Ear -->
      <path d="M 52 20 L 58 24 M 50 35 L 56 39" stroke="#E3D4F0" stroke-width="2" stroke-linecap="round" />

      <ellipse cx="105" cy="42" rx="14" ry="36" fill="#FFFFFF" stroke="#5C3A4E" stroke-width="4" transform="rotate(8 105 42)" />
      <ellipse cx="105" cy="44" rx="8" ry="24" fill="#FFD4E5" transform="rotate(8 105 44)" />
      <!-- Stitch on Right Ear -->
      <path d="M 102 20 L 108 24 M 104 35 L 110 39" stroke="#E3D4F0" stroke-width="2" stroke-linecap="round" />

      <!-- Head Body -->
      <ellipse cx="80" cy="96" rx="52" ry="46" fill="#FFFFFF" stroke="#5C3A4E" stroke-width="4" />
      <ellipse cx="80" cy="96" rx="46" ry="40" fill="none" stroke="#E3D4F0" stroke-width="2" stroke-dasharray="4 4" />

      <!-- Eyes according to emotion -->
      <g v-if="emotion === 'happy' || emotion === 'celebrate'">
        <path d="M 55 90 Q 62 82 69 90" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
        <path d="M 91 90 Q 98 82 105 90" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
      </g>
      <g v-else-if="emotion === 'empathetic'">
        <ellipse cx="62" cy="90" rx="4.5" ry="6" fill="#5C3A4E" />
        <circle cx="64" cy="88" r="2" fill="#FFFFFF" />
        <ellipse cx="98" cy="90" rx="4.5" ry="6" fill="#5C3A4E" />
        <circle cx="100" cy="88" r="2" fill="#FFFFFF" />
        <path d="M 54 82 Q 62 85 70 82" fill="none" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />
        <path d="M 90 82 Q 98 85 106 82" fill="none" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />
      </g>
      <g v-else>
        <circle cx="62" cy="90" r="5" fill="#5C3A4E" />
        <circle cx="64" cy="88" r="2" fill="#FFFFFF" />
        <circle cx="98" cy="90" r="5" fill="#5C3A4E" />
        <circle cx="100" cy="88" r="2" fill="#FFFFFF" />
      </g>

      <!-- Bunny Nose & Mouth -->
      <polygon points="80,98 75,93 85,93" fill="#FF8CB7" stroke="#5C3A4E" stroke-width="2" />
      <path d="M 80 98 L 80 104 M 73 104 Q 80 109 87 104" fill="none" stroke="#5C3A4E" stroke-width="3" stroke-linecap="round" />

      <!-- Pink Cheeks -->
      <ellipse cx="46" cy="100" rx="10" ry="7" fill="#FFB6D9" opacity="0.85" />
      <ellipse cx="114" cy="100" rx="10" ry="7" fill="#FFB6D9" opacity="0.85" />

      <!-- Little Flower / Star Accessory -->
      <circle cx="110" cy="62" r="6" fill="#FFC94D" stroke="#5C3A4E" stroke-width="2" />
      <circle cx="110" cy="62" r="2" fill="#E85C96" />
    </svg>

    <!-- HEDGEHOG MASCOT (Dudu - Nature) -->
    <svg v-else-if="character === 'hedgehog'" viewBox="0 0 160 160" class="w-full h-full drop-shadow-md">
      <!-- Soft Round Spines -->
      <path d="M 28 85 Q 20 60 40 40 Q 60 20 85 20 Q 115 20 135 45 Q 150 70 140 100 Q 130 130 95 138 Q 45 140 28 85 Z" fill="#9CD8B9" stroke="#5C3A4E" stroke-width="4" />
      <!-- Spine Stitches -->
      <path d="M 45 35 L 50 42 M 75 26 L 80 34 M 110 32 L 115 40 M 130 65 L 125 73" stroke="#7CC7A7" stroke-width="2.5" stroke-linecap="round" />

      <!-- Face Area -->
      <ellipse cx="80" cy="94" rx="46" ry="38" fill="#FFF4DE" stroke="#5C3A4E" stroke-width="4" />

      <!-- Ears -->
      <circle cx="46" cy="74" r="10" fill="#FFF4DE" stroke="#5C3A4E" stroke-width="3" />
      <circle cx="46" cy="74" r="5" fill="#FFB6D9" />
      <circle cx="114" cy="74" r="10" fill="#FFF4DE" stroke="#5C3A4E" stroke-width="3" />
      <circle cx="114" cy="74" r="5" fill="#FFB6D9" />

      <!-- Eyes -->
      <g v-if="emotion === 'happy' || emotion === 'celebrate'">
        <path d="M 58 88 Q 65 80 72 88" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
        <path d="M 88 88 Q 95 80 102 88" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
      </g>
      <g v-else-if="emotion === 'empathetic'">
        <circle cx="65" cy="88" r="4.5" fill="#5C3A4E" />
        <circle cx="67" cy="86" r="1.5" fill="#FFFFFF" />
        <circle cx="95" cy="88" r="4.5" fill="#5C3A4E" />
        <circle cx="97" cy="86" r="1.5" fill="#FFFFFF" />
        <path d="M 58 81 Q 65 84 72 81" fill="none" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />
        <path d="M 88 81 Q 95 84 102 81" fill="none" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />
      </g>
      <g v-else>
        <circle cx="65" cy="88" r="5" fill="#5C3A4E" />
        <circle cx="67" cy="86" r="1.5" fill="#FFFFFF" />
        <circle cx="95" cy="88" r="5" fill="#5C3A4E" />
        <circle cx="97" cy="86" r="1.5" fill="#FFFFFF" />
      </g>

      <!-- Snout & Nose -->
      <ellipse cx="80" cy="98" rx="6" ry="4.5" fill="#5C3A4E" />
      <path d="M 75 105 Q 80 110 85 105" fill="none" stroke="#5C3A4E" stroke-width="3" stroke-linecap="round" />

      <!-- Cheeks -->
      <circle cx="50" cy="98" r="7" fill="#FF9EC4" opacity="0.8" />
      <circle cx="110" cy="98" r="7" fill="#FF9EC4" opacity="0.8" />

      <!-- Leaf accessory on spine -->
      <path d="M 105 28 Q 115 15 125 22 Q 120 35 105 28 Z" fill="#7CC7A7" stroke="#5C3A4E" stroke-width="2" />
    </svg>

    <!-- CAT MASCOT (Social) -->
    <svg v-else-if="character === 'cat'" viewBox="0 0 160 160" class="w-full h-full drop-shadow-md">
      <!-- Triangle Cat Ears -->
      <polygon points="35,65 48,22 75,55" fill="#A8DAF0" stroke="#5C3A4E" stroke-width="4" stroke-linejoin="round" />
      <polygon points="42,58 50,32 68,52" fill="#FFC4DB" />

      <polygon points="125,65 112,22 85,55" fill="#A8DAF0" stroke="#5C3A4E" stroke-width="4" stroke-linejoin="round" />
      <polygon points="118,58 110,32 92,52" fill="#FFC4DB" />

      <!-- Head -->
      <ellipse cx="80" cy="92" rx="52" ry="44" fill="#C4E8F8" stroke="#5C3A4E" stroke-width="4" />
      <ellipse cx="80" cy="92" rx="46" ry="38" fill="none" stroke="#83C2E6" stroke-width="2" stroke-dasharray="4 4" />

      <!-- Eyes -->
      <g v-if="emotion === 'happy' || emotion === 'celebrate'">
        <path d="M 55 86 Q 63 78 71 86" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
        <path d="M 89 86 Q 97 78 105 86" fill="none" stroke="#5C3A4E" stroke-width="4" stroke-linecap="round" />
      </g>
      <g v-else-if="emotion === 'empathetic'">
        <circle cx="63" cy="86" r="5" fill="#5C3A4E" />
        <circle cx="65" cy="84" r="2" fill="#FFFFFF" />
        <circle cx="97" cy="86" r="5" fill="#5C3A4E" />
        <circle cx="99" cy="84" r="2" fill="#FFFFFF" />
        <path d="M 55 79 Q 63 82 71 79" fill="none" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />
        <path d="M 89 79 Q 97 82 105 79" fill="none" stroke="#5C3A4E" stroke-width="2" stroke-linecap="round" />
      </g>
      <g v-else>
        <circle cx="63" cy="86" r="5" fill="#5C3A4E" />
        <circle cx="65" cy="84" r="2" fill="#FFFFFF" />
        <circle cx="97" cy="86" r="5" fill="#5C3A4E" />
        <circle cx="99" cy="84" r="2" fill="#FFFFFF" />
      </g>

      <!-- Whiskers -->
      <line x1="32" y1="92" x2="48" y2="94" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />
      <line x1="30" y1="100" x2="48" y2="99" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />
      <line x1="128" y1="92" x2="112" y2="94" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />
      <line x1="130" y1="100" x2="112" y2="99" stroke="#5C3A4E" stroke-width="2.5" stroke-linecap="round" />

      <!-- Cute Nose & Mouth -->
      <polygon points="80,95 76,91 84,91" fill="#FF8CB7" stroke="#5C3A4E" stroke-width="2" />
      <path d="M 74 100 Q 80 105 86 100" fill="none" stroke="#5C3A4E" stroke-width="3" stroke-linecap="round" />

      <!-- Cheeks -->
      <circle cx="48" cy="96" r="8" fill="#FF9EC4" opacity="0.8" />
      <circle cx="112" cy="96" r="8" fill="#FF9EC4" opacity="0.8" />

      <!-- Bell on Collar -->
      <circle cx="80" cy="132" r="6" fill="#FFC94D" stroke="#5C3A4E" stroke-width="2" />
      <circle cx="80" cy="133" r="1.5" fill="#5C3A4E" />
    </svg>

    <!-- DEFAULT FALLBACK: Bear -->
    <svg v-else viewBox="0 0 160 160" class="w-full h-full drop-shadow-md">
      <circle cx="80" cy="80" r="50" fill="#F4BA7B" stroke="#5C3A4E" stroke-width="4" />
      <circle cx="65" cy="75" r="5" fill="#5C3A4E" />
      <circle cx="95" cy="75" r="5" fill="#5C3A4E" />
      <circle cx="80" cy="88" r="6" fill="#5C3A4E" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  character: {
    type: String,
    default: 'bear', // 'bear' | 'rabbit' | 'hedgehog' | 'cat'
    validator: (val) => ['bear', 'rabbit', 'hedgehog', 'cat'].includes(val)
  },
  emotion: {
    type: String,
    default: 'neutral', // 'neutral' | 'happy' | 'empathetic' | 'celebrate' | 'thinking'
    validator: (val) => ['neutral', 'happy', 'empathetic', 'celebrate', 'thinking'].includes(val)
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg' | 'xl'
    validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val)
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-16 h-16'
    case 'md': return 'w-28 h-28'
    case 'lg': return 'w-40 h-40'
    case 'xl': return 'w-52 h-52'
    default: return 'w-28 h-28'
  }
})

const animationClass = computed(() => {
  if (props.emotion === 'happy') return 'animate-bounce-gentle'
  if (props.emotion === 'celebrate') return 'animate-bounce-gentle'
  if (props.emotion === 'empathetic') return 'animate-wiggle-gentle'
  return 'animate-float-slow'
})
</script>

