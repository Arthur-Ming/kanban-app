import styles from './index.module.scss';
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

const MainPage = () => (
  <main className={styles.root}>
    <section className={styles.box}>
      <div className={styles.text}>
        <h1 className={styles.title}>Kanban board for teams to organize their work</h1>
        <p className={styles.subtitle}>
          Collaborate, manage projects, and reach new productivity peaks. Accomplish it all with RS
          Project Management App
        </p>
      </div>
      <Hero className={styles.hero} />
    </section>
  </main>
);

export default MainPage;
