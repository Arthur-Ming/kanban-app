import { ColumnId } from 'interfaces';
import Column from './Column';

type Props = {
  columnIds: ColumnId[];
};

const Columns = ({ columnIds }: Props) => (
  <>
    {columnIds.map((columnId: string) => (
      <Column key={columnId} columnId={columnId} />
    ))}
  </>
);

export default Columns;
