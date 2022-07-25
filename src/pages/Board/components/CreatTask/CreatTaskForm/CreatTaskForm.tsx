import useCreatCardForm from 'hooks/tasks/useCreatCardForm';
import Textarea from 'components/Textarea';
import { ICreatTask, ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import { creatTask } from 'redux/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'react';

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

interface DispatchProps {
  creatTask: (title: string) => void;
}

interface OwnProps {
  boardId: string;
  columnId: string;
}

type TProps = DispatchProps & OwnProps;

const CreatCardForm = ({ creatTask }: TProps) => {
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

const mapDispatchToProps = (dispatch: Dispatch<ICreatTask>, props: OwnProps) => ({
  creatTask: (title: string) =>
    dispatch(
      creatTask({
        boardId: props.boardId,
        columnId: props.columnId,
        title,
      })
    ),
});

export default connect(null, mapDispatchToProps)(CreatCardForm);
