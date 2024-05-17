import { useAccountHook } from "@/hooks/use-user-hook";
import { DataTable } from "./tables/data-table";
import { accountColumn } from "./tables/account-columns";

export const UserAccountList = () => {
  const { isLoading, error, data } = useAccountHook();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  if (!data) {
    return <div>No Data</div>;
  }
  console.log(data);

  return (
    <div className="w-full flex flex-col p-12">
      <div className="mt-12 text-4xl">
        <h1>Account List</h1>
      </div>

      <DataTable columns={accountColumn} data={data}></DataTable>
    </div>
  );
};
