import { useLanguage } from 'hooks/useLanguage';
import { ITask, ITEXT } from 'interfaces';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import styles from '../index.module.scss';
import TaskTitleEdit from './TaskTitleEdit';

const TEXT_TASK_CONTENT_HEADER: ITEXT = {
  inList: {
    en: 'in list',
    ru: 'в колонке',
  },
};

interface IProps {
  task: ITask;
  columnTitle?: string;
  onCloseClick: () => void;
}

const TaskContentHeader = ({ task, columnTitle, onCloseClick }: IProps) => {
  const lang = useLanguage();

  return (
    <header className={styles.header}>
      {/* <TitleIcon className={styles.icon} />
      {isTitleEdit ? (
        <TaskTitleEdit
          value={newTitle}
          onChange={handlers.onChange}
          onSubmit={handlers.onSubmit}
          onKeyDown={handlers.onKeyDown}
          onCancel={handlers.onCancel}
        />
      ) : (
        <h2 className={styles.header_title} onClick={handlers.onClick}>
          {newTitle}
        </h2>
      )} */}
      <p className={styles.subtext}>
        {TEXT_TASK_CONTENT_HEADER.inList[lang]} <span className={styles.column}>{columnTitle}</span>{' '}
      </p>
    </header>
  );
};

export default TaskContentHeader;
