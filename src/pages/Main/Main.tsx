import s from './style.module.scss';
import { useLanguage } from 'hooks/useLanguage';
import NotFound from 'pages/NotFound';
import Loader from 'components/Loader';
import BoardTickets from '../Boards/BoardTickets';

interface ILANG {
  [key: string]: string;
}

export interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_MAIN_PAGE: Readonly<ITEXT> = {
  title: {
    en: 'Main page',
    ru: 'Главная страница',
  },
};

const MainPage = () => {
  const lang = useLanguage();

  return (
    <div>Main Page</div>
    /* <div className={s.page}>
      <h2 className={s.title}>{TEXT_MAIN_PAGE.title[lang]}</h2>
      <BoardsList />
    </div> */
  );
};

export default MainPage;
