/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUser } from './types';

import nullPicture from '../../../../../assets/images/nullProfilePicture.png';

import styles from './styles.module.sass';
import { UserType } from '../../../../main/IPC/User/types';
import User from '../../../components/User';

interface ListProps {
  handleOpenChat(user: Omit<UserType, 'token'>): void;
}

const List = ({ handleOpenChat }: ListProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [myFriends, setMyFriends] = useState<Omit<UserType, 'token'>[]>([]);

  const user = window.electron.store.get('user') as UserType;

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('getMyFriends', {});
  },[]);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'getMyFriendsResponse',
      (result: Omit<UserType, 'token'>[]) => {
        setMyFriends(result);
      }
    );
  },[]);

  useEffect(() => {
    const profilePicture = window.electron.store.get(
      'userProfilePicture'
    ) as string;

    const splitName = user.fullName.split(' ');
    const nameAndSurname = `${splitName[0]} ${splitName[splitName.length - 1]}`;

    setCurrentUser({
      ...user,
      profilePicture,
      nameAndSurname,
    });
  }, []);

  const handleOpenImageProfile = () => {

  }

  return (
    <div className={styles.list}>
      <header>
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                currentUser?.profilePicture
                  ? currentUser.profilePicture
                  : nullPicture
              }
              alt="imagem de perfil"
            />
          </div>
          <div>
            <h4>{currentUser?.nameAndSurname}</h4>
            <Link to="/profile">Minha Conta</Link>
          </div>
        </div>
      </header>
      <main>
        {myFriends.map((friend) => (
          <User
            key={friend._id}
            user={friend}
            onClick={() => handleOpenChat(friend)}
            onClickImage={handleOpenImageProfile}
          />
        ))}
      </main>
    </div>
  );
};

export default List;
