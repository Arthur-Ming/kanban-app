import CreationForm from 'components/CreationForm';
import useOutside from 'hooks/useOutside';
import { IBoard, ICreateColumnBody } from 'interfaces';
import { RefObject, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useCreateColumnMutation } from 'redux/api/columns';
import styles from './index.module.scss';

interface OwnProps {
  board?: IBoard;
}

type Props = OwnProps;

const ColumnCreation = ({ board }: Props) => {
  const navigate = useNavigate();
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);
  useOutside<HTMLDivElement>(wrapperRef, `/boards/${board?.id}`);
  const [cr, { isLoading }] = useCreateColumnMutation();

  const onCancel = () => {
    navigate(`/boards/${board?.id}`);
  };

  return (
    <div className={styles.box} ref={wrapperRef}>
      <CreationForm
        onSubmit={(body: ICreateColumnBody) => cr({ board, body })}
        onCancel={onCancel}
        isLoading={isLoading}
        placeholder="dbfdbdfnfngf"
      />
    </div>
  );
};

export default ColumnCreation;
