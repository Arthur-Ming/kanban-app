import styles from './index.module.scss';
import {
  FieldError,
  FieldValues,
  UseControllerProps,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import { ITask } from 'interfaces';
import { apiRoutes } from 'redux/api/api';
import { useUploadFileMutation } from 'redux/api/files';

type Inputs = {
  image: string;
};

type Props = {
  task: ITask;
};

const ImageUploader = ({ task }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [upload] = useUploadFileMutation();

  return (
    <form method="post" encType="multipart/form-data" action="/upload">
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
