import styles from './index.module.scss';
import { useLanguage } from 'hooks/useLanguage';
import NotFound from 'pages/NotFound';
import Loader from 'components/Loader';
import BoardTickets from '../Boards/BoardTickets';
import { ReactComponent as Hero } from './hero.svg';

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
  return (
    <main className={styles.box}>
      <div>
        <h2>Kanban board for teams to organize their work</h2>
        <p>
          Collaborate, manage projects, and reach new productivity peaks. Accomplish it all with RS
          Project Management App
        </p>
      </div>
      <Hero className={styles.hero} />
    </main>
  );
};

export default MainPage;
