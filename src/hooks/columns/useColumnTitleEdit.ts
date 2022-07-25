import { IColumn, IUpdateColumn } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

export default function (column: IColumn) {
  const { boardId = '' } = useParams();

  const { title, _id: columnId } = column;
  const [newTitle, setValue] = useState(title);
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
    if (column && newTitle?.trim()) {
      console.log({
        title: newTitle.trim(),
        order: column.order,
      });
    }
    setValue(newTitle?.trim());
    setIsTitleEdit(false);
  };

  const onClick = () => setIsTitleEdit(true);

  return {
    newTitle,
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
