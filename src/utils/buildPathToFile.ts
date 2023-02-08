import { IFile } from 'interfaces';

export default function (file: IFile, url = 'http://localhost:8000/uploads') {
  return `${url}/${file.filename}.${file.extension}`;
}
