<template>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M15 13C13.8972 13 13 13.8972 13 15C13 16.1028 13.8972 17 15 17C16.1028 17 17 16.1028 17 15C17 13.8972 16.1028 13 15 13ZM15 16.7926C14.0116 16.7926 13.2074 15.9885 13.2074 15C13.2074 14.0115 14.0116 13.2074 15 13.2074C15.9885 13.2074 16.7926 14.0116 16.7926 15C16.7927 15.9885 15.9885 16.7926 15 16.7926Z" 
:fill="iconColor"/>
<path d="M15 8C11.1398 8 8 11.1398 8 15C8 18.8602 11.1398 22 15 22C18.8602 22 22 18.8602 22 15C22 11.1398 18.8602 8 15 8ZM15 18.3818C13.1349 18.3818 11.6182 16.8651 11.6182 15C11.6182 13.1349 13.1349 11.6182 15 11.6182C16.8651 11.6182 18.3818 13.1349 18.3818 15C18.3818 16.8651 16.8651 18.3818 15 18.3818Z" 
:fill="iconColor"/>
</g>
<defs>
<filter id="filter0_d" x="-1" y="-1" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="4"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.223529 0 0 0 0 0.223529 0 0 0 0.3 0"/>
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
      default: 'wheel',
    },
    width: {
      type: [Number, String],
      default: 30,
    },
    height: {
      type: [Number, String],
      default: 30,
    },
    iconColor: {
      type: String,
      default: '#FF3939',
    },
  },
};
</script>