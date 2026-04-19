/**
 * ButtonDuo
 * Two buttons side-by-side in a flex row:
 *   primary  → filled   #17A2B8, white text
 *   secondary→ ghost    rgba(11,78,107,0.2) bg + #17A2B8 border, white text
 *
 * Props:
 *   primaryLabel   / primaryTo   / onPrimaryClick
 *   secondaryLabel / secondaryTo / onSecondaryClick
 */
import { Link } from 'react-router-dom';

const Btn = ({ label, to, onClick, variant = 'primary', className = '' }) => {
  const base =
    'inline-flex items-center justify-center gap-6 px-5 py-2.5 text-sm font-semibold text-white rounded-xs transition-all duration-150 cursor-pointer';

  const styles = {
    primary: {
      bg: '#17A2B8',
      hover: '#138496',
      border: 'none',
    },
    secondary: {
      bg: 'rgba(11, 78, 107, 0.20)',
      hover: 'rgba(11, 78, 107, 0.35)',
      border: '1.5px solid #17A2B8',
    },
  };

  const s = styles[variant];

  const styleObj = {
    backgroundColor: s.bg,
    border: s.border,
  };

  const handleEnter = e => (e.currentTarget.style.backgroundColor = s.hover);
  const handleLeave = e => (e.currentTarget.style.backgroundColor = s.bg);

  if (to) {
    return (
      <Link
        to={to}
        className={`${base} ${className}`}
        style={styleObj}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${className}`}
      style={styleObj}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {label}
    </button>
  );
};

const ButtonDuo = ({
  primaryLabel = 'Confirm',
  primaryTo = null,
  onPrimaryClick,
  secondaryLabel = 'Cancel',
  secondaryTo = null,
  onSecondaryClick,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Btn label={primaryLabel} to={primaryTo} onClick={onPrimaryClick} variant="primary" />
      <Btn label={secondaryLabel} to={secondaryTo} onClick={onSecondaryClick} variant="secondary" />
    </div>
  );
};

export default ButtonDuo;
