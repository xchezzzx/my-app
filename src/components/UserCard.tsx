import { Link } from "react-router-dom";
import type { DummyUser } from "../api/dummyUsers";
import '../styles/users.css'

type Props = {
  user: DummyUser;
}

export default function UserCard({ user }: Props) {
  return (
    <Link to={`/users/${user.id}`} state={{ user }} className="user-card">
      <div className="user-card__top">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-card__avatar"
        />

        <div className="user-card__info">
          <div className="user-card__name">
            {user.firstName}
          </div>
          <div className="user-card__name">
            {user.lastName}
          </div>
        </div>
      </div>
    </Link>
  )
}