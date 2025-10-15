"use client";
import { useRef, useEffect, useState, useOptimistic, useTransition } from "react";

export default function UsersList() {
  const interval = useRef(null);

  const [loadingTime, setLoadingTime] = useState(10);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [errorCount, setErrorCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [optimisticFilter, setOptimisticFilter] = useOptimistic(filter);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(err => console.error("Error:", err));
  }, []);

  // Fetch users with a simulated delay
  const filterUsers = gender => {
    setLoadingTime(3);
    startTransition(async () => {
      setOptimisticFilter(gender);
      setErrorCount((prev) => prev + 1);
      const currentAttempt = errorCount + 1;
      try {
        await new Promise((r) => setTimeout(r, 3000)); // Delay 3 seconds for realism
  
        if (currentAttempt % 4 === 0) // Simulate an error every 2nd attempt
          throw new Error("Simulated network error");
        
        setFilter(gender);
        console.log("Transition run for " + gender)
      } catch (err) {
        console.error("Error:", err);
      }
    });
  };

  useEffect(() => {
    if (loadingTime === 0) {
      interval.current = null;
      setLoadingTime(0);
    }
    else if (loadingTime !== 0)
      interval.current = setInterval(() => setLoadingTime(prev => prev - 1), 1000);
    
    return () => clearInterval(interval.current);
  }, [loadingTime]);

  const filteredUsers = filter === "all" ? users : users.filter(u => u.gender.toLowerCase() === filter)

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-xl font-semibold">Dummy Users</h1>

      <div className="flex gap-3">
        {["all", "male", "female"].map((val) => (
          <button
            key={val}
            onClick={() => filterUsers(val)}
            className={`px-4 py-2 rounded-xl border ${
              optimisticFilter === val
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {val.toUpperCase()}
          </button>
        ))}
      </div>

      {isPending || 0 === users.length ? (
        <p className="text-gray-600">Loading data ({loadingTime}s delay)...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="p-4 rounded-2xl border shadow-sm bg-white flex gap-4 items-center"
            >
              <img
                src={u.image}
                alt={u.firstName}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">
                  {u.firstName} {u.lastName}
                </p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-sm">{u.gender}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}