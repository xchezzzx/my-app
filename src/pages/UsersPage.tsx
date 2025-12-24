import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUsers } from "../api/dummyUsers";
import UserCard from "../components/UserCard";
import '../styles/users.css'
import { Link } from "react-router-dom";

export default function UsersPage() {
    const [page] = useState(0);
    const limit = 20;
    const skip = page * limit;

    const q = useQuery({
        queryKey: ['users', { limit, skip }],
        queryFn: () => fetchUsers(limit, skip),
    });

    if (q.isLoading) return <div>Loading...</div>
    if (q.isError) return <div>Error: {q.error.message}</div>

    const users = q.data?.users ?? []

    return (
        <div>
            <h4>User List</h4>
            <div className="users-grid">
              {users.map(u => 
                <UserCard key={u.id} user ={u} />
              )}
            </div>
            <Link to="/">← Back</Link>
        </div>
    )
}