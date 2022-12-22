import Column from './Column';

type Props = {
  columnIds: string[];
};

const Columns = ({ columnIds }: Props) => (
  <>
    {columnIds.map((columnId: string) => (
      <Column key={columnId} columnId={columnId} />
    ))}
  </>
);

export default Columns;
