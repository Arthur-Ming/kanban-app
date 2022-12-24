import ConfirmPopup from 'components/ConfirmPopup';
import Modal from 'components/Modal';
import { useLanguage } from 'hooks/useLanguage';
import { ITask, ITEXT } from 'interfaces';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from '../index.module.scss';

const TEXT_REMOVE_TASK: ITEXT = {
  title: {
    en: 'Delete card?',
    ru: 'Удалить карточку?',
  },
};

interface Props {
  task: ITask;
  onDelete: (boardId: string, columnId: string, taskId: string) => void;
}

const RemoveTask = ({ task, onDelete }: Props) => {
  const lang = useLanguage();
  const isRemove = false;
  return (
    <div
      className={styles.remove}
      onClick={() => {
        console.log('remove');
      }}
    >
      <RemoveIcon
        className={styles.remove_icon}
        /* onClick={onLabelClick} */
      />
      {isRemove && (
        <Modal handleClickOutside={() => console.log(' onCanselClick')}>
          <ConfirmPopup
            title={TEXT_REMOVE_TASK.title[lang]}
            onLeftClick={() => console.log(' onCanselClick')}
            onRightClick={() => console.log(' onCanselClick')}
          />
        </Modal>
      )}
    </div>
  );
};

export default RemoveTask;
