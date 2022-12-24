import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';

const TEXT_CREAT_CARD_FORM: ITEXT = {
  placeholder: {
    en: 'Enter a title for this card…',
    ru: 'Ввести заголовок для этой карточки',
  },
  button: {
    en: 'Add card',
    ru: 'Добавить карточку',
  },
};
/* 
interface DispatchProps {
  creatTask: (title: string) => void;
} */

interface OwnProps {
  boardId: string;
  columnId: string;
}

type TProps = /* DispatchProps & */ OwnProps;

const CreatCardForm = ({ boardId, columnId }: TProps) => {
  return (
    <div>CreatCardForm</div>
    /*   <Textarea
      onSubmit={handlers.onSubmit}
      onKeyDown={handlers.onKeyDown}
      onCloseClick={handlers.onCloseClick}
      textareaEl={textareaEl}
      buttonTitle={TEXT_CREAT_CARD_FORM.button[lang]}
      placeholder={TEXT_CREAT_CARD_FORM.placeholder[lang]}
      isDisabled={isDisabled}
    /> */
  );
};

export default CreatCardForm;
