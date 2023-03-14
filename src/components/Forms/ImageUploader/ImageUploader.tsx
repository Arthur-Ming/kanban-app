import styles from './index.module.scss';
import { useForm } from 'react-hook-form';
import { ITask } from 'interfaces';
import { useUploadFileMutation } from 'redux/api/files';

type Inputs = {
  image: string;
};

type Props = {
  task: ITask;
};

const ImageUploader = ({ task }: Props) => {
  const { register } = useForm<Inputs>();

  const [upload] = useUploadFileMutation();

  return (
    <form>
      <label className={styles.file_preview} style={{ backgroundImage: `url()` }}>
        <input
          className={styles.file_input}
          type="file"
          accept="image/*"
          {...register('image')}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              const data = new FormData();
              data.append('image', file);
              upload({ task, file: data });
            }
          }}
          disabled={false}
        />
      </label>
    </form>
  );
};

export default ImageUploader;
