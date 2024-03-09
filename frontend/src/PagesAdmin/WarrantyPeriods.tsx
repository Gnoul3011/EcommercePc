import { useCallback, useEffect, useState } from "react";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import axios from "axios";
import WarrantyPeriodAdminStatus from "../Components/WarrantyPeriodAdminStatus/WarrantyPeriodAdminStatus";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import ButtonAddWarrantyPeriod from "../Components/Button/button-add-warranty-period";

interface WarrantyPeriod {
  id: string;
  months: number;
}

const WarrantyPeriodsAdmin = () => {
  const [warrantyPeriods, setWarrantyPeriods] = useState<WarrantyPeriod[]>([]);

  const fetchWarrantyPeriods = useCallback(async () => {
    const response = await axios.get("http://127.0.0.1:8080/warranty-period");
    setWarrantyPeriods(response.data);
  }, []);

  useEffect(() => {
    fetchWarrantyPeriods();
  }, [fetchWarrantyPeriods()]);

  return (
    <MantineProvider>
      <ModalsProvider>
        <div className="header-content">
          <h4 className="page-title">Warranty Period</h4>
          <Breadcrumbs />
        </div>
        <div className="body-content">
          <div className="button-admin">
            <ButtonAddWarrantyPeriod onFinish={() => {}} />
          </div>
          <table className="table-centered">
            <thead className="table-light">
              <tr>
                <th className="sorting" style={{ width: "150px" }}>
                  ID
                </th>
                <th className="sorting">Months</th>
                <th className="sorting" style={{ width: "150px" }}>
                  Action
                </th>
              </tr>
            </thead>
            {warrantyPeriods.map((warrantyPeriod) => (
              <WarrantyPeriodAdminStatus
                key={warrantyPeriod.id}
                id={warrantyPeriod.id}
                months={warrantyPeriod.months}
              />
            ))}
          </table>
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default WarrantyPeriodsAdmin;
