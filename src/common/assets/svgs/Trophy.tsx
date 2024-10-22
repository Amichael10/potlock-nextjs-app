const Trophy = (props: any) => {
  return (
    <svg
      {...props}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66797 18V16H8.66797V12.9C7.8513 12.7167 7.12214 12.3708 6.48047 11.8625C5.8388 11.3542 5.36797 10.7167 5.06797 9.95C3.81797 9.8 2.77214 9.25417 1.93047 8.3125C1.0888 7.37083 0.667969 6.26667 0.667969 5V4C0.667969 3.45 0.863802 2.97917 1.25547 2.5875C1.64714 2.19583 2.11797 2 2.66797 2H4.66797V0H14.668V2H16.668C17.218 2 17.6888 2.19583 18.0805 2.5875C18.4721 2.97917 18.668 3.45 18.668 4V5C18.668 6.26667 18.2471 7.37083 17.4055 8.3125C16.5638 9.25417 15.518 9.8 14.268 9.95C13.968 10.7167 13.4971 11.3542 12.8555 11.8625C12.2138 12.3708 11.4846 12.7167 10.668 12.9V16H14.668V18H4.66797ZM4.66797 7.8V4H2.66797V5C2.66797 5.63333 2.8513 6.20417 3.21797 6.7125C3.58464 7.22083 4.06797 7.58333 4.66797 7.8ZM14.668 7.8C15.268 7.58333 15.7513 7.22083 16.118 6.7125C16.4846 6.20417 16.668 5.63333 16.668 5V4H14.668V7.8Z"
        fill={props.fill || "#91321B`"}
      />
    </svg>
  );
};

export default Trophy;
