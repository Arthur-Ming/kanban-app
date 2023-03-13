import { IBoard, ICreationInput, IFetchError } from 'interfaces';
import styles from './index.module.scss';
import { Route, Routes, useNavigate } from 'react-router';
import BoardUpdate from '../BoardUpdate';
import BoardUpdateLink from '../BoardUpdateLink';
import { useUpdateBoardMutation } from 'redux/api/boards';
import { toast } from 'react-toastify';
import { RefObject, useRef } from 'react';
import useOutside from 'hooks/useOutside';

type Props = {
  board: IBoard;
};

const BoardHeader = ({ board }: Props) => {
  const [update, { isError, error }] = useUpdateBoardMutation();

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }

    toast.error('failed to update board', {
      toastId: errorStatus,
    });
  }

  return (
    <div className={styles.box}>
      <Routes>
        <Route path={`update`} element={<BoardUpdate board={board} update={update} />} />
        <Route path="/*" element={<BoardUpdateLink board={board} />} />
      </Routes>
    </div>
  );
};

export default BoardHeader;
