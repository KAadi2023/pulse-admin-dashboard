
// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import RTL from "layouts/rtl";
import Tables from "layouts/tables";
import VirtualReality from "layouts/virtual-reality";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import AdminSignIn from "layouts/authentication/admin-sign-in";
import UsersTable from "layouts/Users";
import MessagesTable from "layouts/Messages";
import ChatsTable from "layouts/Chats";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="25px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <ArgonBox component="i" color="info" fontSize="25px" className="ni ni-app" />,
    component: <VirtualReality />,
  },
  {
    type: "route",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <ArgonBox component="i" color="error" fontSize="25px" className="ni ni-world-2" />,
    component: <RTL />,
  },
  { type: "title", title: "Data", key: "users-data" },
  {
    type: "route",
    name: "Users Table",
    key: "tables",
    route: "/admin/users",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="25px" className="ni ni-circle-08" />
    ),
    component: <UsersTable />,
  },
  {
    type: "route",
    name: "Messages Table",
    key: "tables",
    route: "/admin/messages",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="25px" className="ni ni-email-83" />
    ),
    component: <MessagesTable />,
  },
  {
    type: "route",
    name: "Chats Table",
    key: "tables",
    route: "/admin/chats",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="25px" className="ni ni-chat-round" />
    ),
    component: <ChatsTable />,
  },
  {
    route: "/admin/sign-in",
    component: <AdminSignIn />,
  },
];

export default routes;
