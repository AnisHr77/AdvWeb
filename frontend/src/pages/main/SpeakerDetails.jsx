import { useParams, Link } from 'react-router-dom';

const mockSpeakers = {
  1: { name: 'Dr. Alice Martin', topic: 'AI in Web Development', country: 'USA', bio: 'Dr. Martin is a leading researcher in AI-driven web solutions with over 15 years of experience at MIT.' },
  2: { name: 'Prof. Karim Benali', topic: 'Distributed Systems', country: 'France', bio: 'Prof. Benali specializes in large-scale distributed architectures and is a professor at Sorbonne University.' },
  3: { name: 'Dr. Yuki Tanaka', topic: 'WebAssembly & Performance', country: 'Japan', bio: 'Dr. Tanaka leads performance engineering at a major tech firm in Tokyo, with dozens of published papers.' },
  4: { name: 'Dr. Sara Osei', topic: 'Cybersecurity Trends', country: 'Ghana', bio: 'Dr. Osei is a cybersecurity expert advising governments and organizations across Africa and Europe.' },
};

const SpeakerDetails = () => {
  const { id } = useParams();
  const speaker = mockSpeakers[id];

  if (!speaker) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Speaker Not Found</h1>
        <Link to="/speakers" className="text-indigo-600 hover:underline">← Back to Speakers</Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link to="/speakers" className="text-indigo-500 hover:underline text-sm">← Back to Speakers</Link>
      <div className="mt-8 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-3xl">
          {speaker.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{speaker.name}</h1>
          <p className="text-indigo-600 mt-1">{speaker.topic}</p>
          <p className="text-sm text-gray-400">{speaker.country}</p>
        </div>
      </div>
      <p className="mt-8 text-gray-600 leading-relaxed">{speaker.bio}</p>
    </main>
  );
};

export default SpeakerDetails;
