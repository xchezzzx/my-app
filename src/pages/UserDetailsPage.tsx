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
  if (!Number.isFinite(userId) || userId <= 0) return <div>Bad ID</div>
  if (q.isLoading) return <div>Loading...</div>
  if (q.isError) return <div>Error: {q.error.message}</div>

  const user = q.data
  if (!user) return <div>No user found</div>

  return (
    <div>
      <Link to="/users">← Back</Link>

      <div className="user-details-page">
        
        <div className="user-details-card">
          <div className="user-details-top">

            <img src={user.image}
              className="user-details-avatar" />

            <div className="user-details-main">
              <div className="user-details-name">
                {user.firstName} {user.lastName}
              </div>

              <a href={`mailto:${user.email}`}className="user-details-email">
                {user.email}
              </a>

            </div>
          </div>

          <div className="user-details-extra">
            <div className="user-details-row">
              <span className="user-details-label">Phone:</span>
              <span> {user.phone}</span>
            </div>
          </div>

          <div className="user-details-extra">
            <div className="user-details-row">
              <span className="user-details-label">Company:</span>
              <span> {user.company.name}</span>
            </div>
          </div>

          <div className="user-details-extra">
            <div className="user-details-row">
              <span className="user-details-label">Role:</span>
              <span> {user.role}</span>
            </div>
          </div>

          <div className="user-details-extra">
            <div className="user-details-row">
              <span className="user-details-label">Age:</span>
              <span> {user.age}</span>
            </div>
          </div>

          <div className="user-details-extra">
            <div className="user-details-row">
              <span className="user-details-label">Username:</span>
              <span> {user.username}</span>
            </div>
          </div>

          <div className="user-details-extra">
            <div className="user-details-row">
              <span className="user-details-label">IP:</span>
              <span> {user.ip}</span>
            </div>
          </div>

          {q.isFetching ? <div style={{ marginTop: 8 }}>Updating...</div> : null}
        </div>
      </div>
    </div>
  )

}