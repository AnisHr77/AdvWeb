const committees = {
  'General Chairs': ['Prof. Mohamed Salah — Algeria', 'Dr. Laura Chen — Canada'],
  'Program Committee': ['Dr. Nadia Belkacem — France', 'Prof. James Odhiambo — Kenya', 'Dr. Mei Lin — China'],
  'Technical Committee': ['Dr. Ivan Petrov — Russia', 'Eng. Sofia Rossi — Italy', 'Dr. Ahmed Mansour — Egypt'],
};

const Committee = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Committee</h1>
      <p className="text-gray-500 mb-10">
        The AdvWeb 2025 organizing and program committee members.
      </p>
      <div className="space-y-10">
        {Object.entries(committees).map(([group, members]) => (
          <div key={group}>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 border-b border-indigo-100 pb-2">
              {group}
            </h2>
            <ul className="space-y-2">
              {members.map((m) => (
                <li key={m} className="text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Committee;
