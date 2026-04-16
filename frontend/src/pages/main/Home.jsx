const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <span className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
        International Conference 2025
      </span>
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Welcome to <span className="text-indigo-600">AdvWeb 2025</span>
      </h1>
      <p className="text-lg text-gray-500 max-w-xl">
        A premier international conference on advanced web technologies,
        bringing together researchers, engineers, and innovators worldwide.
      </p>
      <div className="flex gap-4 mt-8">
        <a
          href="/register"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Register Now
        </a>
        <a
          href="/program"
          className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
        >
          View Program
        </a>
      </div>
    </main>
  );
};

export default Home;
