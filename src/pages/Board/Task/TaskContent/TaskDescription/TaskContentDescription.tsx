import { useLanguage } from 'hooks/useLanguage';
import { ITask, ITEXT } from 'interfaces';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../index.module.scss';
import TaskContentDescriptionEdit from './TaskContentDescriptionEdit';
import { taskByIdSelector } from 'redux/selectors/tasks';
import { RootState } from 'redux/reducer';
import { connect } from 'react-redux';

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

const TaskContentDescription = ({ task }: IProps) => {
  const lang = useLanguage();

  return (
    <section className={styles.description}>
      <DescriptionIcon className={styles.icon} />
      <h3 className={styles.subtitle}>{TEXT_TASK_CONTENT_DESCRIPTION.title[lang]}</h3>
      {/* {isEdit ? (
        <TaskContentDescriptionEdit
          value={newDescription}
          placeholder={TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription[lang]}
          onChange={handlers.onChange}
          onCancelClick={handlers.onCancelClick}
          onSaveClick={handlers.onSaveClick}
          isDisabled={false}
        />
      ) : (
        <div className={styles.description_text} onClick={handlers.onClick}>
          {newDescription === ' '
            ? TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription[lang]
            : newDescription}
        </div>
      )} */}
    </section>
  );
};

export default TaskContentDescription;
