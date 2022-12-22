import { IBoard } from 'interfaces';
import CreatBoard from './CreatBoard';
import BoardCard from './BoardCard';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { boardsListSelector } from 'redux/selectors';
import { RootState } from 'redux/reducer';

interface StateProps {
  boards: IBoard[];
}

const BoardsList = ({ boards }: StateProps) => (
  <div className={styles.container}>
    {boards.map(({ title, id, description }) => (
      <BoardCard id={id} description={description} title={title} key={id} />
    ))}
    <CreatBoard />
  </div>
);

const mapStateToProps = (state: RootState) => ({
  boards: boardsListSelector(state),
});

export default connect(mapStateToProps)(BoardsList);
