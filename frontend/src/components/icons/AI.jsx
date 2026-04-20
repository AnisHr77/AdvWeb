const AI = ({
  width = 24,
  height = 24,
  color = '#0B4F6C',
  className = '',
  alt = 'Artificial Intelligence',
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
    <path d="M12 5.00005C12.0032 3.91124 11.4162 2.90617 10.4663 2.37399C9.51643 1.8418 8.35277 1.86605 7.42588 2.43736C6.49899 3.00866 5.9544 4.03732 6.00298 5.12505C4.81196 5.43129 3.828 6.26836 3.33482 7.3949C2.84164 8.52144 2.89407 9.81222 3.47698 10.8951C2.45001 11.7294 1.90207 13.0176 2.01334 14.336C2.12462 15.6545 2.8807 16.8327 4.03298 17.4831C3.84199 18.9607 4.48813 20.4221 5.70967 21.2752C6.93122 22.1283 8.52569 22.2318 9.84725 21.5437C11.1688 20.8556 11.9984 19.49 12 18.0001V5.00005" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.99993 13C10.7168 12.396 11.9008 10.8173 11.9999 9M6.00293 5.125C6.0227 5.60873 6.15926 6.0805 6.40093 6.5M3.47693 10.896C3.65987 10.747 3.85563 10.6145 4.06193 10.5M5.99993 18C5.31076 18.0003 4.6332 17.8226 4.03293 17.484M11.9999 13H15.9999M11.9999 18H17.9999C19.1038 18 19.9999 18.8962 19.9999 20V21M11.9999 8H19.9999M15.9999 8V5C15.9999 3.89617 16.8961 3 17.9999 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 13C15.5 13.276 15.724 13.5 16 13.5C16.276 13.5 16.5 13.276 16.5 13C16.5 12.724 16.276 12.5 16 12.5C15.724 12.5 15.5 12.724 15.5 13V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 3C17.5 3.27596 17.724 3.5 18 3.5C18.276 3.5 18.5 3.27596 18.5 3C18.5 2.72404 18.276 2.5 18 2.5C17.724 2.5 17.5 2.72404 17.5 3V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 21C19.5 21.276 19.724 21.5 20 21.5C20.276 21.5 20.5 21.276 20.5 21C20.5 20.724 20.276 20.5 20 20.5C19.724 20.5 19.5 20.724 19.5 21V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.5 8C19.5 8.27596 19.724 8.5 20 8.5C20.276 8.5 20.5 8.27596 20.5 8C20.5 7.72404 20.276 7.5 20 7.5C19.724 7.5 19.5 7.72404 19.5 8V8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default AI;
