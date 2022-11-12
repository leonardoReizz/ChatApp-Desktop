/* eslint-disable no-unneeded-ternary */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'renderer/types/types';
import nullPicture from '../../../../../assets/images/nullProfilePicture.png';

import styles from './styles.module.sass';
import { CurrentUser } from './types';

const List = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    const user = window.electron.store.get('user') as User;
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
      <ul>
        <li>a</li>
      </ul>
    </div>
  );
};

export default List;
