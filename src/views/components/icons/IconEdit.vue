<template>
    <svg :width="width" :height="height" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<g clip-path="url(#clip0)">
<path d="M27.1511 20.0767C26.8209 20.0767 26.5533 20.3442 26.5533 20.6744V25.9815C26.5522 26.9715 25.7501 27.7738 24.7602 27.7747H7.98862C6.99864 27.7738 6.19662 26.9715 6.19545 25.9815V10.4054C6.19662 9.41568 6.99864 8.61343 7.98862 8.61226H13.2958C13.6259 8.61226 13.8935 8.34468 13.8935 8.01453C13.8935 7.68462 13.6259 7.41681 13.2958 7.41681H7.98862C6.33881 7.41868 5.00187 8.75562 5 10.4054V25.9818C5.00187 27.6316 6.33881 28.9685 7.98862 28.9704H24.7602C26.41 28.9685 27.7469 27.6316 27.7488 25.9818V20.6744C27.7488 20.3442 27.4812 20.0767 27.1511 20.0767Z" 
:fill="iconColor"/>
<path d="M27.5121 5.87884C26.4616 4.82839 24.7586 4.82839 23.7081 5.87884L13.0443 16.5426C12.9712 16.6157 12.9185 16.7063 12.8909 16.8058L11.4886 21.8684C11.4309 22.076 11.4895 22.2983 11.6418 22.4508C11.7942 22.603 12.0165 22.6616 12.2241 22.6042L17.2868 21.2016C17.3862 21.174 17.4768 21.1213 17.5499 21.0482L28.2135 10.3842C29.2623 9.33304 29.2623 7.63139 28.2135 6.58024L27.5121 5.87884ZM14.3467 16.9311L23.0742 8.20343L25.8889 11.0181L17.1612 19.7458L14.3467 16.9311ZM13.7845 18.0593L16.0332 20.3083L12.9227 21.1701L13.7845 18.0593ZM27.3682 9.53897L26.7343 10.1729L23.9194 7.35798L24.5536 6.72406C25.137 6.14058 26.0831 6.14058 26.6666 6.72406L27.3682 7.42546C27.9508 8.00964 27.9508 8.95502 27.3682 9.53897Z" 
:fill="iconColor"/>
</g>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="34" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.984314 0 0 0 0 0.952941 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
<clipPath id="clip0">
<rect x="5" y="5" width="24" height="24" fill="white"/>
</clipPath>
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

