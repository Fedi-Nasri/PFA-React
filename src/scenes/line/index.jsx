import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import LineChartHum from "../../components/LineChartHum";

const Line = () => {
  return (
    <Box m="20px">
        <div>hello chart</div>
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="35vh">
        <LineChart />
      </Box>
      <Box height="35vh">
        <LineChartHum />
      </Box>
    </Box>
  );
};

export default Line;