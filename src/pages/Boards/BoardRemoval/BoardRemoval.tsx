import Removal from 'components/Removal';
import { IBoard } from 'interfaces';
import { connect } from 'react-redux';
import { removeBoard } from 'redux/actions/boards';
import { AppDispatch } from 'redux/store';

type OwnProps = {
  board: IBoard;
};

type DispatchProps = {
  remove: () => void;
};

type Props = OwnProps & DispatchProps;

const BoardRemoval = ({ remove }: Props) => <Removal onConfirm={remove} />;

const mapDispatchToProps = (dispatch: AppDispatch, { board }: OwnProps) => ({
  remove: () => dispatch(removeBoard(board)),
});

export default connect(null, mapDispatchToProps)(BoardRemoval);
