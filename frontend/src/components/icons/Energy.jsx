const Energy = ({
  width = 21,
  height = 21,
  color = '#0B4F6C',
  className = '',
  alt = 'Renewable Energy',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={alt}
    role="img"
  >
    <path d="M10 19C6.3593 19.011 3.31793 16.2294 3.00478 12.6021C2.69164 8.97484 5.21128 5.7131 8.80005 5.1C14.5 4 16 3.48 18 1C19 3 20 5.18 20 9C20 14.5 15.22 19 10 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 20C1 17 2.85 14.64 6.08 14C8.5 13.52 11 12 12 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Energy;
