type Inputs = {
  title: string;
};

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  createButton: {
    en: 'create',
    ru: 'создать',
  },
  inputPlaceholder: {
    en: 'Title of new board',
    ru: 'Имя доски задач',
  },
  textAreaPlaceholder: {
    en: 'Description of new board',
    ru: 'Описание доски задач',
  },
};

const CreatBoard = () => {
  return <div>!!!!</div>;
};

export default CreatBoard;
