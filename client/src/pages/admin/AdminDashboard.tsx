import AdminMenu from "@/components/admin/AdminMenu";
import { Card } from "@/components/ui/card";
import { useCurrentUserQuery } from "@/store/slices/api/userApi";

const AdminDashboard = () => {
  const { data: currentUser } = useCurrentUserQuery();

  return (
    <AdminMenu>
      <Card className="p-3 lg:w-[80%]">
        <h3>Admin Name - {currentUser?.name}</h3>
        <h3>Admin Email - {currentUser?.email}</h3>
        <h3>Admin Contact - {currentUser?.phone}</h3>
      </Card>
    </AdminMenu>
  );
};

export default AdminDashboard;
