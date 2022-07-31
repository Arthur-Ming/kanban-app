import { IColumn, IUpdateColumn } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

export default function (column: IColumn) {
  const { boardId = '' } = useParams();

  /* const { title, _id: columnId } = column; */
  const [title, setValue] = useState(column.title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const onKeyDown: FormEventHandler<HTMLInputElement> = (event) => {
    if ((event as { key?: string }).key === 'Enter') {
      onSubmit();
    }
  };

  const onCancel = () => {
    setValue(title);
    setIsTitleEdit(false);
  };

  const onSubmit = () => {
    if (column && title?.trim()) {
      console.log({
        title: title.trim(),
        order: column.order,
      });
    }
    setValue(title?.trim());
    setIsTitleEdit(false);
  };

  const onClick = () => setIsTitleEdit(true);

  return {
    title,
    isTitleEdit,
    setIsTitleEdit,
    handlers: {
      onKeyDown,
      onChange,
      onClick,
      onCancel,
      onSubmit,
    },
  };
}
