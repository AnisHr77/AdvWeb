const Security = ({
  width = 24,
  height = 24,
  color = '#0B4F6C',
  className = '',
  alt = 'Cybersecurity',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={alt}
    role="img"
  >
    <path d="M20 13C20 18 16.5 20.5 12.34 21.95C12.1222 22.0238 11.8855 22.0202 11.67 21.94C7.5 20.5 4 18 4 13V5.99996C4 5.44805 4.44808 4.99996 5 4.99996C7 4.99996 9.5 3.79996 11.24 2.27996C11.6777 1.90603 12.3223 1.90603 12.76 2.27996C14.51 3.80996 17 4.99996 19 4.99996C19.5523 4.99996 20 5.44768 20 5.99996V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Security;
