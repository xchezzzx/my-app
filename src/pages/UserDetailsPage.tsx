import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchUserById, type DummyUser } from "../api/dummyUsers";

type LocationState = { user?: DummyUser }

export default function UserDetailPage() {
  const { id } = useParams();
  const userId = id ? Number(id) : NaN;
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? null;

  const useFromState = state?.user

  const q = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: Number.isFinite(userId) && userId > 0,
    initialData: useFromState,
    staleTime: 10000
  })

  if (!id) return <div>No </div>
  if (!Number.isFinite(userId) || userId <=0) return <div>Bad ID</div>
  if (q.isLoading) return <div>Loading...</div>
  if (q.isError) return <div>Error: {q.error.message}</div>

  const user = q.data
  if (!user) return <div>No user found</div>

  return (
    <div>
      <div style={{ padding: 16, placeItems: 'center',  minWidth: '320px' }}>
        <Link to="/users">← Back</Link>

        <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
          <img src={user.image} width={110} height={110} style={{ borderRadius: 16, objectFit: 'cover' }} />
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ margin: 0 }}>{user.firstName} {user.lastName}</h2>
            <a href={ `mailto:${user.email}`}
               style={{ opacity: 0.75 }}>{user.email}</a>
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: 'left' }}>
          <div><b>Phone:</b> {user.phone}</div>
          <div><b>Company:</b> {user.company.name}</div>
          <div><b>Role:</b> {user.role}</div>
          <div><b>Age:</b> {user.age}</div>
          <div><b>Username:</b> {user.username}</div>
          <div><b>IP:</b> {user.ip}</div>
        </div>

        {q.isFetching ? <div style={{ marginTop: 8 }}>Updating...</div> : null}
      </div>
    </div>
  )

}