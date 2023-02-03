import { Route, Routes, useNavigate } from 'react-router';

interface Props {
  title: string;
  children: React.ReactNode;
  extraClass?: string;
}

const TaskUpdateLink = ({ title, children, extraClass }: Props) => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path={`update`} element={children} />
      <Route
        path="/*"
        element={
          <h4 onClick={() => navigate(`update`)} className={extraClass}>
            {title}
          </h4>
        }
      />
    </Routes>
  );
};

export default TaskUpdateLink;
