<template>
    <svg :width="width" :height="height" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M21.9219 23.375V25.25C21.9219 27.3178 20.2397 29 18.1719 29H8.75C6.68219 29 5 27.3178 5 25.25V8.75C5 6.68219 6.68219 5 8.75 5H18.1719C20.2397 5 21.9219 6.68219 21.9219 8.75V10.625C21.9219 11.1428 21.5022 11.5625 20.9844 11.5625C20.4666 11.5625 20.0469 11.1428 20.0469 10.625V8.75C20.0469 7.71619 19.2057 6.875 18.1719 6.875H8.75C7.71619 6.875 6.875 7.71619 6.875 8.75V25.25C6.875 26.2838 7.71619 27.125 8.75 27.125H18.1719C19.2057 27.125 20.0469 26.2838 20.0469 25.25V23.375C20.0469 22.8572 20.4666 22.4375 20.9844 22.4375C21.5022 22.4375 21.9219 22.8572 21.9219 23.375ZM28.3135 15.3896L26.2142 13.2903C25.848 12.9241 25.2544 12.9241 24.8884 13.2903C24.5222 13.6563 24.5222 14.2499 24.8884 14.616L26.3816 16.1094H15.125C14.6072 16.1094 14.1875 16.5291 14.1875 17.0469C14.1875 17.5647 14.6072 17.9844 15.125 17.9844H26.3816L24.8884 19.4778C24.5222 19.8438 24.5222 20.4374 24.8884 20.8035C25.0715 20.9866 25.3113 21.0781 25.5512 21.0781C25.7913 21.0781 26.0311 20.9866 26.2142 20.8035L28.3135 18.7042C29.2274 17.7903 29.2274 16.3035 28.3135 15.3896Z" 
:fill="iconColor"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="33.9989" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.984314 0 0 0 0 0.952941 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
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
      default: 34,
    },
    height: {
      type: [Number, String],
      default: 34,
    },
    iconColor: {
      type: String,
      default: '#03FBF3',
    },
  },
};
</script>
