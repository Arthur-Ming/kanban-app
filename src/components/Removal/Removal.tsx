import classNames from 'classnames';
import ConfirmPopup from 'components/ConfirmPopup';
import Modal from 'components/Modal';
import { useState } from 'react';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import styles from './index.module.scss';

type Props = {
  onConfirm: () => void;
  iconClass?: string;
  disabled?: boolean;
};

const Removal = ({ onConfirm, iconClass, disabled }: Props) => {
  const [isRemoveMode, setRemoveMode] = useState(false);
  return (
    <div className={styles.remove}>
      <button onClick={() => setRemoveMode(true)} className={styles.button} disabled={disabled}>
        <RemoveIcon className={classNames(styles.remove_icon, iconClass)} />
      </button>

      {isRemoveMode && (
        <Modal
          handleClickOutside={() => {
            setRemoveMode(false);
          }}
        >
          <ConfirmPopup
            title="Are you sure?"
            onLeftClick={() => {
              onConfirm();
              setRemoveMode(false);
            }}
            onRightClick={() => {
              setRemoveMode(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Removal;
