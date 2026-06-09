"use client";

const availableTasks = [
  { id: 1, name: "Deliver package", location: "New York", time: "1h ago" },
  { id: 2, name: "Home cleaning", location: "San Francisco", time: "1h ago" },
  { id: 3, name: "Repair plumbing", location: "Los Angeles", time: "1h ago" },
  { id: 4, name: "Grocery shopping", location: "Chicago", time: "1h ago" },
];

export default function AvailableTasksList() {
  return (
    <div className="bg-gray-50 dark:bg-black mt-10">
      <div className="rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Available Tasks
          </h2>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {availableTasks.map((task, index) => (
            <li
              key={task.id}
              className={`${
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-gray-950"
                  : "bg-gray-50 dark:bg-gray-900"
              } flex items-center justify-between px-4 py-3 transition`}
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {task.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {task.location} • {task.time}
                </p>
              </div>
              <button
                onClick={() => alert(`Viewing Task: ${task.name}`)}
                className="px-3 py-1 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
