import { useMemo, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type UserSelectorProps = {
  users: User[];
  onSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUserId: number | null;
};

export function UserSelector({
  users,
  onSelectedUserId,
  selectedUserId,
}: UserSelectorProps) {
  const [isButtonTriggered, setIsButtonTriggered] = useState(false);

  const selectedUser: User | undefined = useMemo(() => {
    return users.find(user => user.id === selectedUserId);
  }, [selectedUserId, users]);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsButtonTriggered(!isButtonTriggered)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isButtonTriggered && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUserId === user.id,
                })}
                onClick={e => {
                  e.preventDefault();
                  onSelectedUserId(user.id);
                  setIsButtonTriggered(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
