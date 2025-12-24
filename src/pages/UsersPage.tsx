import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchUsers } from "../api/dummyUsers";
import UserCard from "../components/UserCard";
import '../styles/users.css'
import { Link } from "react-router-dom";

function buildPageItems(current: number, total: number) {
  const items: (number | '...')[] = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) items.push(i)
    return items
  }

  const add = (x: number | '...') => items.push(x)

  add(1)

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) add('...')

  for (let i = left; i <= right; i++) add(i)

  if (right < total - 1) add('...')

  add(total)

  return items
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;

  const q = useQuery({
    queryKey: ['users', { limit, skip }],
    queryFn: () => fetchUsers(limit, skip),
    staleTime: 30_000
  });


  const users = q.data?.users ?? []
  const total = q.data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total/limit))

  const pageItems = useMemo(() => buildPageItems(page, totalPages), [page, totalPages])
  const canPrev = page > 1;
  const canNext = page < totalPages;
  if (q.isLoading) return <div>Loading...</div>
  if (q.isError) return <div>Error: {q.error.message}</div>

  return (
    <div>
      <Link to="/">← Back</Link>
      <h4>User List</h4>

      <div className="users-grid">
        {users.map(u =>
          <UserCard key={u.id} user={u} />
        )}
      </div>
      
      <div className="pager">
        <div className="pager-row">
          <button className="pager-btn"
                  disabled={!canPrev || q.isFetching}
                  onClick={() => setPage(p => Math.max(1, p-1))}>
            Prev
          </button>

          <div className="pager-pages">
              {pageItems.map((it, idx) =>
                it === '...' ? (
                  <span key={`dots-${idx}`} className="pager-dots">…</span>
                ) : (
                  <button
                    key={it}
                    className={`pager-page ${it === page ? 'is-active' : ''}`}
                    disabled={q.isFetching}
                    onClick={() => setPage(it)}
                  >
                    {it}
                  </button>
                )
              )}
            </div>

          <button className="pager-btn"
                  disabled={!canNext || q.isFetching}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
            Next
          </button>          
        </div>

        <div className="pager-info">
          Page {page} / {totalPages}
          {q.isFetching ? <span className="pager-fetching"> • Updating…</span> : null}
        </div>

      </div>
    </div>
  )
}