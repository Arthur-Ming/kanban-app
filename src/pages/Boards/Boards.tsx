import BoardTickets from './BoardTickets';
import BoardCreation from './BoardCreation';
import styles from './index.module.scss';
import { Route, Routes } from 'react-router';
import Loader from 'components/Loader';
import CreationTicket from 'components/CreationTicket';
import { useLoadBoardsQuery } from 'redux/api/boards';

const Boards = () => {
  const { isLoading } = useLoadBoardsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className={styles.box}>
      <BoardTickets />
      <div className={styles.create}>
        <Routes>
          <Route path="/*" element={<CreationTicket label="создать доску" path="create" />} />
          <Route path="create" element={<BoardCreation />} />
        </Routes>
      </div>
    </div>
  );
};

export default Boards;
