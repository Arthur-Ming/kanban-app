import useCreatCardForm from 'hooks/tasks/useCreatCardForm';
import Textarea from 'components/Textarea';
import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import { creatTask } from 'redux/actions';
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
  columnId: string;
  creatTask?: (title: string) => void;
}

const CreatCardForm = ({ creatTask, boardId, columnId }: IProps) => {
  const { handlers, textareaEl, isDisabled } = useCreatCardForm(creatTask);
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
  creatTask: (title: string) =>
    dispatch(
      creatTask({
        boardId: props.boardId,
        columnId: props.columnId,
        title,
      })
    ),
});

/* const mapDispatchToProps = {
  creatTask,
}; */

export default connect(null, mapDispatchToProps)(CreatCardForm);
