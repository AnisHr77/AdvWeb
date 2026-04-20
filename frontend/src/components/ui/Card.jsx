/**
 * Card
 * Props:
 *   icon      — JSX element (SVG or emoji)
 *   bgIcon    — CSS color string for the icon background circle
 *   title     — string
 *   description — string
 *   className — extra classes
 */
const Card = ({ icon, bgIcon = '#E0F2FE', title, description, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 ${className}`}
      style={{ border: '1px solid #00000014' }}
    >
      {/* Icon badge */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgIcon }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="text-[1.0625rem] font-bold text-text-main">{title}</h3>
        <p className="mt-2 text-sm text-text-secondary leading-snug">{description}</p>
      </div>
    </div>
  );
};

export default Card;
