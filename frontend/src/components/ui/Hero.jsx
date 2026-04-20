import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import IconChevronRight from '../icons/ChevronRight';

/**
 * Hero Component
 * 
 * Props:
 * @param {string} title - Main headline
 * @param {string} description - Subtitle/description text
 * @param {Array} breadcrumbs - Array of { label, path } for navigation
 * @param {string} height - Tailwind height class (e.g., 'min-h-screen', 'min-h-[400px]')
 * @param {string} image - Background image URL
 * @param {string} overlayColor - CSS background/gradient for the overlay
 * @param {string} maxWidth - Tailwind max-width class for the text container
 * @param {React.ReactNode} children - Additional content (buttons, etc.)
 */
const Hero = ({ 
  title, 
  description, 
  breadcrumbs = [], 
  height = 'min-h-[60vh]', 
  image, 
  overlayColor = 'linear-gradient(135deg, rgba(9,59,87,0.82) 0%, rgba(9,59,85,0.85) 100%)',
  maxWidth = 'max-w-2xl',
  isLight = false,
  children
}) => {
  return (
    <section 
      className={`relative ${height} flex items-center overflow-hidden`}
      style={{
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: !image ? (isLight ? '#FBFDFE' : 'var(--primary-dark)') : 'transparent'
      }}
    >
      {/* Dynamic Overlay */}
      <div 
        className="absolute inset-0"
        style={{ background: overlayColor }}
      />

      <div className="relative z-10 app-container py-20 w-full">
        <div className={maxWidth}>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className={`flex items-center gap-2 text-sm mb-6 ${isLight ? 'text-gray-400' : 'text-white/70'}`}>
              {breadcrumbs.map((crumb, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span className="opacity-40">
                      <IconChevronRight />
                    </span>
                  )}
                  {crumb.path ? (
                    <Link to={crumb.path} className={`transition-colors ${isLight ? 'hover:text-[#023047]' : 'hover:text-white'}`}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={`${isLight ? 'text-[#023047]' : 'text-white'} font-medium`}>{crumb.label}</span>
                  )}
                </Fragment>
              ))}
            </nav>
          )}

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 ${isLight ? 'text-black' : 'text-white'}`}>
            {title}
          </h1>

          {description && (
            <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-2xl ${isLight ? 'text-[#6B7280]' : 'text-white/90'}`}>
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default Hero;
