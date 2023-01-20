import Removal from 'components/Removal';
import { IColumn } from 'interfaces';
import { useDeleteColumnMutation } from 'redux/api';

type OwnProps = {
  column: IColumn;
};

type Props = OwnProps;

const ColumnRemoval = ({ column }: Props) => {
  const [deleteColumn, rest] = useDeleteColumnMutation();

  return <Removal onConfirm={() => deleteColumn(column)} />;
};

export default ColumnRemoval;
