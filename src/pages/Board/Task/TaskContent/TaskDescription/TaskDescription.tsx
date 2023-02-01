import { ITask, ITEXT } from 'interfaces';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from './index.module.scss';
import { Route, Routes, useNavigate } from 'react-router';

import TaskUpdate from '../TaskUpdate';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import TaskDescriptionUpdate from './TaskDescriptionUpdate';

const TEXT_TASK_CONTENT_DESCRIPTION: ITEXT = {
  title: {
    en: 'Description',
    ru: 'Описание',
  },
  defaultDescription: {
    en: 'Add a more detailed description...',
    ru: 'Добавить более подробное описание...',
  },
};

interface IProps {
  task: ITask;
}

const TaskDescription = ({ task }: IProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.box}>
        <DescriptionIcon className={styles.icon} />
        <h4 className={styles.title}>{TEXT_TASK_CONTENT_DESCRIPTION.title['en']}</h4>
      </div>

      <Routes>
        <Route path={`update`} element={<TaskDescriptionUpdate />} />
        <Route
          path="/*"
          element={
            <p onClick={() => navigate(`update`)}>
              {task?.description || TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription['en']}
            </p>
          }
        />
      </Routes>
    </>
  );
};

export default TaskDescription;
