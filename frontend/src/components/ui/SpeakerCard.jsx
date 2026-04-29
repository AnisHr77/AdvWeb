import IconPin from '../icons/Pin';

const SpeakerCard = ({
  image,
  name,
  title,
  institution,
  note,
  bio,
  tag,
  country,
  variant = 'simple'
}) => {
  const isDetailed = variant === 'detailed';

  return (
    <div className="bg-white rounded-md overflow-hidden border border-slate-100 hover:border-accent-cyan transition-all flex flex-col h-full group">
      {/* Speaker Image */}
      <div className="aspect-[4/3] w-full relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {isDetailed && (
          <div className="flex items-center gap-2 mb-4">
            {tag && (
              <span className="px-3 py-1 rounded-md text-xs font-semibold text-[#0B4F6C] bg-[#E9F7F8] whitespace-nowrap">
                {tag}
              </span>
            )}
            {country && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-gray-500 bg-white border border-slate-100 flex items-center gap-1.5 whitespace-nowrap">
                <IconPin size={12} className="opacity-60" />
                {country}
              </span>
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold text-[#0B1F3A] mb-1">
          {name}
        </h3>

        <p className="text-sm font-medium text-[#0B4F6C] mb-4">
          {title}{institution ? `, ${institution}` : ''}
        </p>

        {!isDetailed && (
          <>
            <hr className="border-black/5 mb-4" />
            <p className="text-sm text-gray-500 leading-relaxed">
              {note}
            </p>
          </>
        )}

        {isDetailed && (
          <>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
              {bio}
            </p>
            <div className="mt-auto">
              <button className="w-full py-2.5 px-4 rounded-md cursor-pointer border border-slate-200 text-xs font-semibold uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-colors">
                View Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpeakerCard;
