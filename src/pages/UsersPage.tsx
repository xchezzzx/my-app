import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUsers } from "../api/dummyUsers";
import UserCard from "../components/UserCard";
import '../styles/users.css'
import { Link } from "react-router-dom";

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const limit = 20;
  const skip = page * limit;

  const q = useQuery({
    queryKey: ['users', { limit, skip }],
    queryFn: () => fetchUsers(limit, skip),
  });

  if (q.isLoading) return <div>Loading...</div>
  if (q.isError) return <div>Error: {q.error.message}</div>

  const users = q.data?.users ?? []
  const total = q.data?.total ?? 0
  const canPrev = page > 0;
  const canNext = skip + limit < total;

  return (
    <div>
      <h4>User List</h4>
      <div className="users-grid">
        {users.map(u =>
          <UserCard key={u.id} user={u} />
        )}
      </div>
      <div>
        <Link to="/">← Back</Link>
        <button disabled={!canPrev || q.isFetching}
                onClick={() => setPage(p => p - 1)}>Prev</button>
        <button disabled={!canNext || q.isFetching}
                onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

    </div>
  )
}