import { useState } from 'react';

export default function () {
  const [isRemove, setIsRemove] = useState(false);

  const onRemoveClick = () => {
    setIsRemove(true);
  };

  const onCancelClick = () => {
    setIsRemove(false);
  };

  return {
    isRemove,
    handlers: {
      onRemoveClick,
      onCancelClick,
    },
  };
}
