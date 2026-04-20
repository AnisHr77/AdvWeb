const Data = ({
  width = 20,
  height = 22,
  color = '#0B4F6C',
  className = '',
  alt = 'Data Science',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={alt}
    role="img"
  >
    <path d="M1 4C1 5.65575 5.03276 7 10 7C14.9672 7 19 5.65575 19 4C19 2.34425 14.9672 1 10 1C5.03276 1 1 2.34425 1 4V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 4V18C1 19.6557 5.03276 21 10 21C14.9672 21 19 19.6557 19 18V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 11C1 12.6557 5.03276 14 10 14C14.9672 14 19 12.6557 19 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Data;
