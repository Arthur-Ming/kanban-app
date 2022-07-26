import { Link } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import s from './style.module.scss';
import { useLanguage } from 'hooks/useLanguage';

interface IProps {
  id: string;
  title: string;
  description: string;
}
type Inputs = {
  title: string;
  description: string;
};

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  titleDelete: {
    en: 'delete',
    ru: 'удалить',
  },
  titleEdit: {
    en: 'edit',
    ru: 'редактировать',
  },
  link: {
    en: 'move to board',
    ru: 'перейти на доску задач',
  },
  deletePopup: {
    en: 'Do you really want to delete the task board?',
    ru: 'Вы действительно хотите удалить доску задач?',
  },
  btnSave: {
    en: 'save',
    ru: 'сохранить',
  },
};

const BoardCard = ({ id }: IProps) => {
  const lang = useLanguage();

  return (
    <div className={s.card}>
      <Link className={s.link} to={`${id}`}>
        <span>{TEXT_PAGE.link[lang]}</span>
      </Link>
    </div>
  );
};

export default BoardCard;
