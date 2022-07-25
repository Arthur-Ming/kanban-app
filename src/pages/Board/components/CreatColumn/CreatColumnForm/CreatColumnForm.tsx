import useCreatCardForm from 'hooks/tasks/useCreatCardForm';
import Textarea from 'components/Textarea';
import { ICreatColumn, ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import { creatColumn } from 'redux/actions';
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
  creatColumn: (title: string) => void;
}

interface OwnProps {
  boardId: string;
}

type TProps = DispatchProps & OwnProps;

const CreatColumnForm = ({ creatColumn }: TProps) => {
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

const mapDispatchToProps = (dispatch: Dispatch<ICreatColumn>, props: OwnProps) => ({
  creatColumn: (title: string) =>
    dispatch(
      creatColumn({
        boardId: props.boardId,
        title,
      })
    ),
});

export default connect(null, mapDispatchToProps)(CreatColumnForm);
