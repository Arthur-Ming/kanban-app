export const getNewTaskBody = ({
  boardId,
  columnId,
  title,
}: {
  boardId: string;
  columnId: string;
  title: string;
}) => {
  return {
    boardId,
    columnId,
    body: {
      title,
    },
  };
};
