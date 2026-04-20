const IconCalendar = ({
  width = 16,
  height = 16,
  stroke = 'currentColor',
  className = '',
  alt = 'Calendar',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label={alt}
    role="img"
  >
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default IconCalendar;
