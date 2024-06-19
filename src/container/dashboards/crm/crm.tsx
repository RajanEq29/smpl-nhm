import { FC, Fragment } from "react";

interface CrmProps {}

const Crm: FC<CrmProps> = () => {
  // for User search function
  return (
    <Fragment>
      <div className="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
        <div>
          <p className="fw-semibold fs-18 mb-0"> Comming Soon !!</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Crm;
