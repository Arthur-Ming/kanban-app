import styles from './styles.module.scss';
import { FaEllipsisH as ControlIcon } from 'react-icons/fa';
import ColumnControlDropdown from '../ColumnControlDropdown';
import { Dispatch, SetStateAction } from 'react';
import Modal from 'components/Modal';
import ConfirmPopup from 'components/ConfirmPopup';
import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import useControlColumn from 'hooks/useControlColumn';
import { connect } from 'react-redux';
import { deleteColumn } from 'redux/actions';
import { AnyAction } from 'redux';

const TEXT_COLUMN_CONTROL: ITEXT = {
  title: {
    en: 'List Actions',
    ru: 'Действия со списком',
  },
  remove: {
    en: 'Delete list?',
    ru: 'Удалить список?',
  },
};

type DispatchProps = {
  onDeleteColumn: () => void;
};

type OwnProps = {
  boardId: string;
  columnId: string;
  setIsTitleEdit: Dispatch<SetStateAction<boolean>>;
};

type IProps = DispatchProps & OwnProps;

const ColumnControl = ({ boardId, columnId, setIsTitleEdit, onDeleteColumn }: IProps) => {
  const { isControlOpen, isRemove, handlers } = useControlColumn(boardId, columnId, onDeleteColumn);
  const lang = useLanguage();
  const onEdit = () => {
    setIsTitleEdit(true);
    handlers.onEditClick();
  };

  return (
    <div className={styles.container} data-id={columnId}>
      <button className={styles.button} disabled={isControlOpen} onClick={handlers.onOpenClick}>
        <ControlIcon className={styles.icon} />
      </button>
      {isControlOpen && (
        <ColumnControlDropdown
          title={TEXT_COLUMN_CONTROL.title[lang]}
          onCloseClick={handlers.onCloseClick}
          onEditClick={onEdit}
          onRemoveClick={handlers.onRemoveClick}
        />
      )}
      {isRemove && (
        <Modal handleClickOutside={handlers.onCancelClick}>
          <ConfirmPopup
            title={TEXT_COLUMN_CONTROL.remove[lang]}
            onLeftClick={handlers.onCancelClick}
            onRightClick={handlers.onDeleteColumn}
          />
        </Modal>
      )}
    </div>
  );
};

const mapDispatchToProps = (
  // dispatch: Dispatch<{ type: string; CallAPI: string; boardId: string; columnId: string }>,
  dispatch: Dispatch<AnyAction>,
  props: OwnProps
) => ({
  onDeleteColumn: () =>
    dispatch(
      deleteColumn({
        boardId: props.boardId,
        columnId: props.columnId,
      })
    ),
});

export default connect(null, mapDispatchToProps)(ColumnControl);
