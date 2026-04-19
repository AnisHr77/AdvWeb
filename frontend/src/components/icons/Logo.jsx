const Logo = ({
  width = 20,
  height = 20,
  className = '',
  alt = 'ISC 2026 Logo',
  fill = '#ffffff',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={alt}
      role="img"
    >
      <path
        d="M9.16675 10C9.16675 10.4599 9.54015 10.8333 10.0001 10.8333C10.46 10.8333 10.8334 10.4599 10.8334 10C10.8334 9.54007 10.46 9.16666 10.0001 9.16666C9.54015 9.16666 9.16675 9.54007 9.16675 10V10"
        stroke={fill}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8334 16.8333C18.5334 15.1417 16.85 10.7 13.0834 6.91667C9.30003 3.15 4.85836 1.46667 3.16669 3.16667C1.46669 4.85833 3.15003 9.3 6.91669 13.0833C10.7 16.85 15.1417 18.5333 16.8334 16.8333"
        stroke={fill}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0834 13.0833C16.85 9.3 18.5334 4.85833 16.8334 3.16667C15.1417 1.46667 10.7 3.15 6.91669 6.91667C3.15003 10.7 1.46669 15.1417 3.16669 16.8333C4.85836 18.5333 9.30003 16.85 13.0834 13.0833"
        stroke={fill}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;