

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
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LinkIcon from '@mui/icons-material/Link';

function UsersTable() {
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
    const [messages, setMessages] = useState([])

    console.log(messages)

    //   axios api to fetch users data
    useEffect(() => {
        fetchMessages();
    }, []);

    // use async and await
    async function fetchMessages() {
        try {
            const response = await axios.get(`${apiEndpoint}/api/v1/admin/messages`);
            setMessages(response?.data.messages)

        } catch (error) {
            console.error("Error fetching messages data:", error);
        }
    }

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            width: 250
        },
        {
            field: 'attachments',
            headerName: 'Attachments',
            width: 250,
            editable: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {params.value.map((attachment, index) => {
                            if (attachment.type === 'image') {
                                return (
                                    <img
                                        key={index}
                                        src={attachment.url}
                                        alt="attachment"
                                        style={{ width: 50, height: 50, borderRadius: '5px' }}
                                    />
                                );
                            } else if (attachment.type === 'pdf') {
                                return (
                                    <a href={attachment.url} key={index} target="_blank" rel="noopener noreferrer">
                                        <PictureAsPdfIcon style={{ fontSize: 50 }} />
                                    </a>
                                );
                            } else if (attachment.type === 'video') {
                                return (
                                    <a href={attachment.url} key={index} target="_blank" rel="noopener noreferrer">
                                        <VideoLibraryIcon style={{ fontSize: 50 }} />
                                    </a>
                                );
                            } else if (attachment.type === 'url') {
                                return (
                                    <a href={attachment.url} key={index} target="_blank" rel="noopener noreferrer">
                                        <LinkIcon style={{ fontSize: 50 }} />
                                    </a>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                );
            },
        },
        {
            field: 'contents',
            headerName: 'Content',
            width: 250,

        },
        {
            field: 'sender',
            headerName: 'Sent By',
            editable: false,
            width: 300,
            renderCell: (params) => {
                if (!params.value) return null;
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <img
                            src={params.value?.avatar}
                            alt="avatar"
                            style={{ width: 50, height: 50, borderRadius: '50%' }}
                        />
                        <span>{params.value?.name}</span>
                    </div>
                );
            },
        },
        {
            field: 'chat',
            headerName: 'Chat ID',
            width: 250,
            editable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <div>{params.row.chat._id}</div>
                    </div>
                );
            },
        },
        {
            field: 'groupChat',
            headerName: 'Group Chat',
            width: 150,
            editable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <div>{params.row.chat.groupChat ? "Yes" : "No"}</div>
                    </div>
                );
            },
        },
        {
            field: 'createdAt',
            headerName: 'Time',
            width: 200,

            renderCell: (params) => {
                const formattedDate = moment(params.value).format("MMMM Do YYYY h:mm A");
                return <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>{formattedDate}</span>
                </div>
            },
        }
    ];


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <ArgonBox mb={3}>
                    <Card>
                        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <ArgonTypography variant="h6">Messages table</ArgonTypography>
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
                            <Box sx={{ height: '55%', width: '100%' }}>
                                <DataGrid
                                    rowHeight={60}
                                    rows={messages}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 10,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        </ArgonBox>
                    </Card>
                </ArgonBox>
            </ArgonBox>
            <Footer />
        </DashboardLayout>
    );
}

export default UsersTable;
