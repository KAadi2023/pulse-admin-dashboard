

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
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

function ChatsTable() {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(chats)

    //   axios api to fetch users data
    useEffect(() => {
        fetchChats();
    }, []);

    // use async and await
    async function fetchChats() {
        setLoading(true)
        try {
            const response = await axios.get(`${apiEndpoint}/api/v1/admin/chats`);
            setChats(response?.data.chats)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching chats data:", error);
        }
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'name',
            headerName: 'Group Name',
            width: 250
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 200,
            renderCell: (params) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    overflow: 'hidden',
                }}>
                    <AvatarGroup total={params.value.length}>
                        {/* map the params.value and render the avatar from url */}
                        {params.value.map((url) => (
                            <Avatar alt="user avatar" src={url} key={url} />
                        ))}
                    </AvatarGroup>
                </div>
            ),
        },
        {
            field: 'totalMembers',
            headerName: 'Total Members',
            type: 'number',
            width: 150
        },
        {
            field: 'members',
            headerName: 'Members',
            width: 300,
            renderCell: (params) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    overflow: 'hidden',
                }}>
                    <AvatarGroup total={params.value.length}>
                        {/* map the params.value and render the avatar from url */}
                        {params.value.map((item) => (
                            <Avatar alt="user avatar" src={item.avatar} key={item._id} />
                        ))}
                    </AvatarGroup>
                </div>
            ),
        },
        {
            field: 'totalMessages',
            headerName: 'Total Messages',
            type: 'number',
            width: 150
        },
        {
            field: 'creator',
            headerName: 'Created By',
            width: 300,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={params.value.avatar || 'default-avatar-url'}
                        alt="creator avatar"
                        style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 10 }}
                    />
                    <span>{params.value.name}</span>
                </div>
            ),
        },
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
                                        <ArgonTypography variant="h6">Chats table</ArgonTypography>
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
                                            rows={chats}
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

export default ChatsTable;
