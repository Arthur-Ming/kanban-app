import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { routes } from 'utils/routes';
import CreatTaskForm from './CreatTaskForm';
import CreaterLabel from '../../../components/CreationLabel';

const TEXT_CREAT_CARD: ITEXT = {
  label: {
    en: 'Add a card',
    ru: 'Добавить карточку',
  },
};

interface OwnProps {
  columnId?: string;
}

type TProps = OwnProps;

const TaskCreation = ({ columnId }: TProps) => {
  const { boardId = '', columnId: id = '' } = useParams();
  const lang = useLanguage();

  return (
    <Routes>
      {columnId === id && (
        <Route
          path={routes.tasks.creat.absolute()}
          element={<CreatTaskForm boardId={boardId} columnId={id} />}
        />
      )}
      <Route
        path="/*"
        element={
          <Link draggable={false} to={routes.tasks.creat.absolute(columnId)}>
            <CreaterLabel label={TEXT_CREAT_CARD.label[lang]} />
          </Link>
        }
      />
    </Routes>
  );
};

export default TaskCreation;
