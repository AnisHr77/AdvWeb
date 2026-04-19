/**
 * ButtonSingle
 * Standalone filled button — bg #0B4F6C, white text
 * Props: label, onClick, to (if used as link), className, type
 */
import { Link } from 'react-router-dom';

const ButtonSingle = ({
  label = 'Button',
  to = null,
  onClick,
  type = 'button',
  className = '',
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-sm transition-colors duration-150 cursor-pointer';
  const style = { backgroundColor: '#0B4F6C' };
  const hoverStyle = '#09405A'; // used via onMouse if needed

  if (to) {
    return (
      <Link
        to={to}
        className={`${base} ${className}`}
        style={style}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = hoverStyle)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = style.backgroundColor)}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${className}`}
      style={style}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = hoverStyle)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = style.backgroundColor)}
    >
      {label}
    </button>
  );
};

export default ButtonSingle;
