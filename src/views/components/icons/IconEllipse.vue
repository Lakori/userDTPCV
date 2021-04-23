<template>
    <svg :width="width" :height="height" viewBox="0 0 200 201" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.9" filter="url(#filter0_d)">
<circle cx="100" cy="100.988" r="80" fill="url(#paint0_radial)"/>
<circle cx="100" cy="100.988" r="80" fill="url(#paint1_linear)" fill-opacity="0.6"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0.987793" width="200" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="10"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0771097 0 0 0 0 0.0550694 0 0 0 0 0.108333 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100.988) rotate(90) scale(80)">
<stop offset="0.333333" stop-color="#5A5A5A"/>
<stop offset="0.854167" stop-color="#ACACAC"/>
<stop offset="1" stop-color="#E3E3E3"/>
</radialGradient>
<linearGradient id="paint1_linear" x1="48.5" y1="25.4999" x2="150.5" y2="175" gradientUnits="userSpaceOnUse">
<stop stop-color="#C1C1C1"/>
<stop offset="1" stop-color="#4B4B4B"/>
</linearGradient>
</defs>
</svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'ellipse',
    },
    width: {
      type: [Number, String],
      default: 200,
    },
    height: {
      type: [Number, String],
      default: 201,
    },
    iconColor: {
      type: String,
      default: 'url(#paint0_linear)',
    },
  },
};
</script>
