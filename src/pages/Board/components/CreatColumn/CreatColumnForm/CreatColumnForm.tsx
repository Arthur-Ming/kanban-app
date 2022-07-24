import useCreatCardForm from 'hooks/tasks/useCreatCardForm';
import Textarea from 'components/Textarea';
import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import { creatColumn } from 'redux/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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

interface IProps {
  boardId: string;
  creatColumn?: (title: string) => void;
}

const CreatColumnForm = ({ creatColumn }: IProps) => {
  const { handlers, textareaEl, isDisabled } = useCreatCardForm(creatColumn);
  const lang = useLanguage();

  return (
    <Textarea
      onSubmit={handlers.onSubmit}
      onKeyDown={handlers.onKeyDown}
      onCloseClick={handlers.onCloseClick}
      textareaEl={textareaEl}
      buttonTitle={TEXT_CREAT_CARD_FORM.button[lang]}
      placeholder={TEXT_CREAT_CARD_FORM.placeholder[lang]}
      isDisabled={isDisabled}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch, props: IProps) => ({
  creatColumn: (title: string) =>
    dispatch(
      creatColumn({
        boardId: props.boardId,
        title,
      })
    ),
});

export default connect(null, mapDispatchToProps)(CreatColumnForm);
