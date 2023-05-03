import { IFile } from 'interfaces';

export default function (file: string, url = 'http://localhost:8000/uploads') {
  return `${url}/${file}`;
}
