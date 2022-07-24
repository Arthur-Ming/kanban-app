import ConfirmPopup from 'components/ConfirmPopup';
import Modal from 'components/Modal';
import useRemoveTask from 'hooks/tasks/useRemoveTask';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteTask } from 'redux/actions';
import styles from '../task.module.scss';

const TEXT_REMOVE_TASK: ITEXT = {
  title: {
    en: 'Delete card?',
    ru: 'Удалить карточку?',
  },
};

interface IProps {
  columnId: string;
  taskId: string;
  onDelete: (boardId: string, columnId: string, taskId: string) => void;
}

const RemoveTask = ({ columnId, taskId, onDelete }: IProps) => {
  const lang = useLanguage();
  const { isRemove, onLabelClick, onClickOutside, onOkClick, onCanselClick } = useRemoveTask(
    columnId,
    taskId,
    onDelete
  );

  return (
    <div>
      <RemoveIcon className={styles.remove} onClick={onLabelClick} />
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
