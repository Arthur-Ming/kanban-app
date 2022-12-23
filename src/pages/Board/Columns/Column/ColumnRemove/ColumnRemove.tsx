import styles from './styles.module.scss';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import { Dispatch } from 'react';
import Modal from 'components/Modal';
import ConfirmPopup from 'components/ConfirmPopup';
import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import { connect } from 'react-redux';
import useColumnRemove from 'hooks/columns/useColumnRemove';

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
  deleteColumn: () => void;
};

type OwnProps = {
  boardId: string;
  columnId: string;
};

type TProps = DispatchProps & OwnProps;

const ColumnRemove = ({ columnId, deleteColumn }: TProps) => {
  const { isRemove, handlers } = useColumnRemove();
  const lang = useLanguage();

  return (
    <div className={styles.container} data-id={columnId}>
      <RemoveIcon className={styles.remove} onClick={handlers.onRemoveClick} />
      {isRemove && (
        <Modal handleClickOutside={handlers.onCancelClick}>
          <ConfirmPopup
            title={TEXT_COLUMN_CONTROL.remove[lang]}
            onLeftClick={handlers.onCancelClick}
            onRightClick={deleteColumn}
          />
        </Modal>
      )}
    </div>
  );
};

export default ColumnRemove;
