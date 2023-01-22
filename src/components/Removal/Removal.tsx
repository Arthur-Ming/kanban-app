import classNames from 'classnames';
import ConfirmPopup from 'components/ConfirmPopup';
import Modal from 'components/Modal';
import { useState } from 'react';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import styles from './index.module.scss';

type Props = {
  onConfirm: () => void;
  iconClass?: string;
};

const Removal = ({ onConfirm, iconClass }: Props) => {
  const [isRemoveMode, setRemoveMode] = useState(false);
  return (
    <div className={styles.remove}>
      <RemoveIcon
        className={classNames(styles.remove_icon, iconClass)}
        onClick={() => setRemoveMode(true)}
      />
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
