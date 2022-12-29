import Removal from 'components/Removal';
import { connect } from 'react-redux';
import { removeColumn } from 'redux/actions/columns';
import { AppDispatch } from 'redux/store';

type OwnProps = {
  boardId: string;
  columnId: string;
};

type DispatchProps = {
  remove: () => void;
};

type Props = OwnProps & DispatchProps;

const ColumnRemoval = ({ remove }: Props) => {
  return <Removal onConfirm={remove} />;
};

const mapDispatchToProps = (dispatch: AppDispatch, { boardId, columnId }: OwnProps) => ({
  remove: () => dispatch(removeColumn(boardId, columnId)),
});

export default connect(null, mapDispatchToProps)(ColumnRemoval);
