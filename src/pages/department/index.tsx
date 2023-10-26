
const DepartmentMain = ({ children }: any) => {
  return (
    <div className="toggler">
      <div className="department-page">
        <>{children} </>
      </div>
    </div>
  );
};

export default DepartmentMain;
