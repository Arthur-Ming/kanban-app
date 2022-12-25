import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import CreaterLabel from '../../../components/CreaterLabel';
import CreatColumnForm from './ColumnCreaterForm';
import styles from './index.module.scss';

const TEXT_CREAT_CARD: ITEXT = {
  label: {
    en: 'Add a column',
    ru: 'Добавить колонку',
  },
};
const ColumnCreater = () => {
  const { boardId = '' } = useParams();
  const lang = useLanguage();
  return (
    <div className={styles.box}>
      <Routes>
        {/*    <Route path="creat-column" element={<CreatColumnForm boardId={boardId} />} /> */}
        <Route
          path="/*"
          element={
            <Link to="creat-column" className={styles.label}>
              <CreaterLabel label={TEXT_CREAT_CARD.label[lang]} />
            </Link>
          }
        />
      </Routes>
    </div>
  );
};

export default ColumnCreater;
