import Removal from 'components/Removal';
import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { removeBoard } from 'redux/actions/boards';
import { AppDispatch } from 'redux/store';

type OwnProps = {
  boardId: string;
};

type DispatchProps = {
  remove: () => void;
};

type Props = OwnProps & DispatchProps;

const BoardRemoval = ({ remove }: Props) => {
  return <Removal onConfirm={remove} />;
};

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps) => ({
  remove: () => dispatch(removeBoard(ownProps.boardId)),
});

export default connect(null, mapDispatchToProps)(BoardRemoval);
