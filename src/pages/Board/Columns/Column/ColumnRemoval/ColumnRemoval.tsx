import Removal from 'components/Removal';
import { IColumn, IFetchError } from 'interfaces';
import { toast } from 'react-toastify';
import { useDeleteColumnMutation } from 'redux/api/columns';
import styles from './index.module.scss';

type OwnProps = {
  column: IColumn;
};

type Props = OwnProps;

const ColumnRemoval = ({ column }: Props) => {
  const [remove, { isLoading, isError, error }] = useDeleteColumnMutation();

  if (isError) {
    const errorStatus = (error as unknown as IFetchError)?.status;
    if (errorStatus === 401 || errorStatus === 403) {
      throw error;
    }
    toast.error('failed to remove column', {
      toastId: errorStatus,
    });
  }

  return <Removal onConfirm={() => remove(column)} iconClass={styles.icon} disabled={isLoading} />;
};

export default ColumnRemoval;
