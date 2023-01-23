import { useLanguage } from 'hooks/useLanguage';
import { IColumn, ITask, ITEXT } from 'interfaces';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { Route, Routes } from 'react-router';
import styles from '../index.module.scss';
import TaskUpdate from '../TaskUpdate';
import TaskUpdateLink from '../TaskUpdateLink';

const TEXT_TASK_CONTENT_HEADER: ITEXT = {
  inList: {
    en: 'in list',
    ru: 'в колонке',
  },
};

type Props = {
  task: ITask;
};

const TaskHeader = ({ task }: Props) => {
  return (
    <header className={styles.header}>
      <Routes>
        <Route path={`update`} element={<TaskUpdate task={task} />} />
        <Route path="/*" element={<TaskUpdateLink task={task} />} />
      </Routes>
      <p className={styles.subtitle}>
        <span>{TEXT_TASK_CONTENT_HEADER.inList['ru']}</span>
        <span className={styles.column}>{'column.title'}</span>
      </p>
    </header>
  );
};

export default TaskHeader;
