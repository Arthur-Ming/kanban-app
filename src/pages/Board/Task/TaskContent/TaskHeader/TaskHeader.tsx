import { IColumn, ITask, ITEXT } from 'interfaces';
import { connect } from 'react-redux';
import { columnByIdSelector } from 'redux/selectors/columns';
import { RootState } from 'redux/store';
import styles from '../index.module.scss';
import TaskTitle from '../TaskTitle';

const TEXT_TASK_CONTENT_HEADER: ITEXT = {
  inList: {
    en: 'in list',
    ru: 'в колонке',
  },
};

type StateProps = {
  column: IColumn;
};

type OwnProps = {
  task: ITask;
};

type Props = OwnProps & StateProps;

const TaskHeader = ({ column, task }: Props) => {
  return (
    <header className={styles.header}>
      <TaskTitle task={task} />
      <p className={styles.subtitle}>
        <span>{TEXT_TASK_CONTENT_HEADER.inList['ru']}</span>
        <span className={styles.column}>{column?.title}</span>
      </p>
    </header>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  column: columnByIdSelector(state, props.task),
});

export default connect(mapStateToProps)(TaskHeader);
