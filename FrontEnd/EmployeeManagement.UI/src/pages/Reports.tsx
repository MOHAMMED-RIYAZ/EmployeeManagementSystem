import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  getHiringTrends,
  getDepartmentGrowth,
  getAttendancePattern,
  getPerformance,
} from "../services/reportService";

const Reports = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReport = async (type: string) => {
    try {
      setLoading(true);

      let result = [];

      if (type === "hiring") {
        result = await getHiringTrends();
        setTitle("Hiring Trends");
      } else if (type === "department") {
        result = await getDepartmentGrowth();
        setTitle("Department Growth");
      } else if (type === "performance") {
        result = await getPerformance();
        setTitle("Performance Report");
      } else {
        result = await getAttendancePattern();
        setTitle("Attendance Pattern");
      }

      setData(result);
    } catch (error) {
      console.error(error);
      alert("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Reports</h2>

        <div className="mb-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => loadReport("hiring")}
          >
            Hiring Trends
          </button>

          <button
            className="btn btn-success me-2"
            onClick={() => loadReport("department")}
          >
            Department Growth
          </button>

          <button
            className="btn btn-warning"
            onClick={() => loadReport("attendance")}
          >
            Attendance Pattern
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => loadReport("performance")}
          >
            Performance
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          <>
            <h4>{title}</h4>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value: any, i) => (
                      <td key={i}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Select a report to view.</p>
        )}
      </div>
    </>
  );
};

export default Reports;
