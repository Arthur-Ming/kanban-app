import Removal from 'components/Removal';
import { IColumn } from 'interfaces';
import { connect } from 'react-redux';
import { removeColumn } from 'redux/actions/columns';
import { AppDispatch } from 'redux/store';

type OwnProps = {
  column: IColumn;
};

type DispatchProps = {
  remove: () => void;
};

type Props = OwnProps & DispatchProps;

const ColumnRemoval = ({ remove }: Props) => <Removal onConfirm={remove} />;

const mapDispatchToProps = (dispatch: AppDispatch, { column }: OwnProps) => ({
  remove: () => dispatch(removeColumn(column)),
});

export default connect(null, mapDispatchToProps)(ColumnRemoval);
