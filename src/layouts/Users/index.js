

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function UsersTable() {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(users)

    //   axios api to fetch users data
    useEffect(() => {
        fetchUsers();
    }, []);

    // use async and await
    async function fetchUsers() {
        setLoading(true);
        try {
            const response = await axios.get(`${apiEndpoint}/api/v1/admin/users`);
            setUsers(response?.data.users)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching users data:", error);
        }
    }

    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: true,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
            editable: true,
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            flex: 1,
            editable: false,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="avatar"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
            ),
        },
        {
            field: 'groups',
            headerName: 'Groups',
            type: 'number',
            flex: 1,
            editable: true,
        },
        {
            field: 'friends',
            headerName: 'Friends',
            type: 'number',
            flex: 1,
            editable: true,
        }
    ];


    return (
        <DashboardLayout>
            {
                loading ? (
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <DashboardNavbar />
                        <ArgonBox py={3}>
                            <ArgonBox mb={3}>
                                <Card>
                                    <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                                        <ArgonTypography variant="h6">Users table</ArgonTypography>
                                    </ArgonBox>
                                    <ArgonBox
                                        sx={{
                                            "& .MuiTableRow-root:not(:last-child)": {
                                                "& td": {
                                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                        `${borderWidth[1]} solid ${borderColor}`,
                                                },
                                            },
                                        }}
                                    >
                                        <DataGrid
                                            rowHeight={60}
                                            rows={users}
                                            columns={columns}
                                            getRowId={(row) => row._id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 10 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10, 25, 50, 100]}
                                            checkboxSelection
                                            disableRowSelectionOnClick
                                        />
                                    </ArgonBox>
                                </Card>
                            </ArgonBox>
                        </ArgonBox>
                        <Footer />
                    </>
                )}
        </DashboardLayout>
    );
}

export default UsersTable;
