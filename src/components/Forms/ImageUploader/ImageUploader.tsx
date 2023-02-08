import styles from './index.module.scss';
import {
  FieldError,
  FieldValues,
  UseControllerProps,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { useFilesUploadMutation } from 'redux/api/tasks';
import { ITask } from 'interfaces';
import { apiRoutes } from 'redux/api/api';

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

  const [upload] = useFilesUploadMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (file: any) => {
    console.log('!!!!');
    console.log(file.image[0]);
    const data = new FormData();
    data.append('image', file.image[0]);
    /*   upload({ task, file: data }); */
    fetch('http://localhost:8000' + `/files/${task.id}/upload`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    /*  console.log(data);
    upload({ task, file: data }); */
  };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      action="/upload"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        className={styles.file_preview}
        style={{ backgroundImage: `url()` }}
        /*  onClick={(e) => {
            if (image) {
              e.preventDefault();
              onDeleteFile();
              console.log('!!!');
            }
          }} */
      >
        <input
          className={styles.file_input}
          type="file"
          accept="image/*"
          {...register('image')}
          onChange={(e) => {
            //  const [file] = e.target.files;
            console.log(e.target.files);
            console.log(e.target.files && e.target.files[0]);
            if (e.target.files) {
              const data = new FormData();
              data.append('image', e.target.files[0]);
              console.log(data);

              /* upload({ task, file: data }); */
            }
          }}
          disabled={false}
        />
      </label>
      <input type="submit" className={styles.button} value="Submit" />
    </form>
  );
};

export default ImageUploader;
