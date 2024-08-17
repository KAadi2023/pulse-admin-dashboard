/* eslint-disable no-unused-vars */


// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";


function Default() {
  const { size } = typography;
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats()
  }, [])


  // Fetch stats data here
  const fetchStats = async () => {
    try {
      setLoading(true);
      // Replace this with your actual API call
      const response = await fetch(`${apiEndpoint}/api/v1/admin/stats`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setStats(data?.stats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stats data:", error);
      setLoading(false);
    }
  }

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
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={3}>
                  <DetailedStatisticsCard
                    title="Total Chats"
                    count={stats?.totalChats}
                    icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
                    percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <DetailedStatisticsCard
                    title="Toatal Users"
                    count={stats?.totalUsers}
                    icon={{ color: "error", component: <i className="ni ni-world" /> }}
                    percentage={{ color: "success", count: "+3%", text: "since last week" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <DetailedStatisticsCard
                    title="Toatal Groups"
                    count={stats?.totalGroups}
                    icon={{ color: "error", component: <i className="ni ni-world" /> }}
                    percentage={{ color: "success", count: "+3%", text: "since last week" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <DetailedStatisticsCard
                    title="Total Messages"
                    count={stats?.totalMessages}
                    icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
                    percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} lg={7}>
                  <GradientLineChart
                    title="Last Messages"
                    description={
                      <ArgonBox display="flex" alignItems="center">
                        <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                          <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                        </ArgonBox>
                        <ArgonTypography variant="button" color="text" fontWeight="medium">
                          33% more{" "}
                          <ArgonTypography variant="button" color="text" fontWeight="regular">
                            from previous week
                          </ArgonTypography>
                        </ArgonTypography>
                      </ArgonBox>
                    }
                    chart={{
                      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                      datasets: [
                        {
                          label: "Mobile apps",
                          color: "info",
                          data: stats.messageChart,
                        },
                      ],
                    }}
                    height="34.125rem"
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <DefaultDoughnutChart
                    title="Stats"
                    description={
                      <ArgonBox display="flex" alignItems="center">
                        <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                          <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                        </ArgonBox>
                        <ArgonTypography variant="button" color="text" fontWeight="medium">
                          13% more{" "}
                          <ArgonTypography variant="button" color="text" fontWeight="regular">
                            from previous
                          </ArgonTypography>
                        </ArgonTypography>
                      </ArgonBox>
                    }
                    chart={{
                      labels: ["Chats", "Users", "Messages", "Groups"],
                      datasets: {
                        label: "Projects",
                        backgroundColors: ["error", "info", "primary", "secondary"],
                        data: [stats?.totalChats, stats?.totalUsers, stats?.totalMessages, stats?.totalGroups],
                      },
                    }}
                    height="34.125rem"
                  />
                </Grid>
              </Grid>
            </ArgonBox>
            < Footer />
          </>
        )}
    </DashboardLayout>
  );
}

export default Default;
