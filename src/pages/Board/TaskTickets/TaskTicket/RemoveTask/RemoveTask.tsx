import ConfirmPopup from 'components/ConfirmPopup';
import Modal from 'components/Modal';
import useRemoveTask from 'hooks/tasks/useRemoveTask';
import { useLanguage } from 'hooks/useLanguage';
import { IDeleteTask, ITask, ITEXT } from 'interfaces';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTask } from 'redux/actions';
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
  const { isRemove, onLabelClick, onClickOutside, onOkClick, onCanselClick } = useRemoveTask(
    task.columnId,
    task.id,
    onDelete
  );

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
        <Modal handleClickOutside={onClickOutside}>
          <ConfirmPopup
            title={TEXT_REMOVE_TASK.title[lang]}
            onLeftClick={onCanselClick}
            onRightClick={onOkClick}
          />
        </Modal>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IDeleteTask>) => ({
  onDelete: (boardId: string, columnId: string, taskId: string) =>
    dispatch(
      deleteTask({
        boardId,
        columnId,
        taskId,
      })
    ),
});

export default connect(null, mapDispatchToProps)(RemoveTask);
