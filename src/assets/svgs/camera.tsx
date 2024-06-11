const CameraSvg = ({ height }: { height?: number }) => (
  <svg width={height || 48} height={height || 48} viewBox={`0 0 48 48`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask0_3178_2528"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={height || 48}
      height={height || 48}
    >
      <rect width={height || 48} height={height || 48} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_3178_2528)">
      <path
        d="M5 40.35C4.2 40.35 3.5 40.05 2.9 39.45C2.3 38.85 2 38.15 2 37.35V11.7C2 10.9333 2.3 10.2417 2.9 9.625C3.5 9.00833 4.2 8.7 5 8.7H12.35L16 4.35H29.7V7.35H17.4L13.75 11.7H5V37.35H39V16.65H42V37.35C42 38.15 41.6917 38.85 41.075 39.45C40.4583 40.05 39.7667 40.35 39 40.35H5ZM39 11.65V7.35H34.7V4.35H39V0H42V4.35H46.35V7.35H42V11.65H39ZM21.975 33C24.3917 33 26.4167 32.1833 28.05 30.55C29.6833 28.9167 30.5 26.8917 30.5 24.475C30.5 22.0583 29.6833 20.0417 28.05 18.425C26.4167 16.8083 24.3917 16 21.975 16C19.5583 16 17.5417 16.8083 15.925 18.425C14.3083 20.0417 13.5 22.0583 13.5 24.475C13.5 26.8917 14.3083 28.9167 15.925 30.55C17.5417 32.1833 19.5583 33 21.975 33ZM21.975 30C20.3917 30 19.0833 29.475 18.05 28.425C17.0167 27.375 16.5 26.0583 16.5 24.475C16.5 22.8917 17.0167 21.5833 18.05 20.55C19.0833 19.5167 20.3917 19 21.975 19C23.5583 19 24.875 19.5167 25.925 20.55C26.975 21.5833 27.5 22.8917 27.5 24.475C27.5 26.0583 26.975 27.375 25.925 28.425C24.875 29.475 23.5583 30 21.975 30Z"
        fill="white"
      />
    </g>
  </svg>
);

export default CameraSvg;
