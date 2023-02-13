import { FileId, IFile } from 'interfaces';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducer';
import { fileByIdSelector } from 'redux/selectors/files';
import buildPathToFile from 'utils/buildPathToFile';
import styles from './index.module.scss';

type OwnProps = {
  fileId: FileId;
};

type StateProps = {
  file: IFile;
};

type Props = OwnProps & StateProps;

const TaskFile = ({ file }: Props) => {
  return (
    <div>
      {file.filename}
      <a
        href={buildPathToFile(file)}
        target="_blank"
        className={styles.img}
        style={{ backgroundImage: `url(${buildPathToFile(file)})` }}
        rel="noreferrer"
      ></a>
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  file: fileByIdSelector(state, props),
});

export default connect(mapStateToProps)(TaskFile);
