import List from 'renderer/pages/Messages/List';
import styles from './styles.module.sass';

export const Messages = (): JSX.Element => {
  return (
    <div className={styles.messages}>
      <List />
      teste
    </div>
  );
};

export default Messages;
