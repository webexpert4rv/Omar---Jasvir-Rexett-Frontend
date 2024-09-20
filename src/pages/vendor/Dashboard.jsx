import React, { useEffect } from "react";
import userImg from "../../assets/img/user-img.jpg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVendorDashboard } from "../../redux/slices/vendorDataSlice";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound";
import { Col, Form, Row } from "react-bootstrap";
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import clientImg from '../../assets/img/amazon.png';
import devImg from '../../assets/img/user-img.jpg';
import devImg2 from '../../assets/img/demo-img.jpg';
import devImg3 from '../../assets/img/laura.jpg';
import { useTranslation } from "react-i18next";

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { vendorDashboard, smallLoader, screenLoader } = useSelector(
    (state) => state.vendorData
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userName = localStorage.getItem("userName");
  useEffect(() => {
    dispatch(getVendorDashboard());
  }, []);

  const handleCardClick = (id) => {
    dispatch(getDeveloperDetails(id));
    navigate(`/vendor-single-developer/${id}`);
  };
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'This Year',
        data: [5000, 20000, 15000, 22000, 18000, 25000, 20000, 10000, 15000, 20000, 25000, 22000],
        borderColor: 'rgb(8, 143, 143)',
        backgroundColor: 'rgba(8, 143, 143 , .05)',
        fill: true,
        tension: 0.4, // Add tension for smooth curves
      },
      {
        label: 'Last Year',
        data: [7000, 12000, 17000, 14000, 19000, 24000, 18000, 14000, 19000, 12000, 18000, 14000],
        borderColor: '#c00',
        backgroundColor: 'rgba(255, 0, 0, 0)',
        fill: true,
        tension: 0.4, // Add tension for smooth curves
        borderDash: [5, 5], // Make the line dashed
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          display: true, // Show y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        position: 'top', // Keep the legend labels
        labels: {
          padding: 20, // Add padding to the legend labels
          align: 'center',
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 2, // Hide points on the line
        hoverRadius: 5, // Hide points on hover
      },
    },
  };

  const TotalProjectData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly',
        data: [250, 210, 340, 400, 380, 420, 350, 500, 550, 490, 380, 500],
        borderColor: 'rgb(8, 143, 143)',
        backgroundColor: 'rgba(8, 143, 143 , .05)',
        fill: true,
        tension: 0.4, // Add tension for smooth curves
      },
    ],
  };
  const TotalProjectOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        grid: {
          display: false, // Remove horizontal grid lines
        },
        ticks: {
          display: false, // Hide y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    elements: {
      point: {
        radius: 0, // Hide points on the line
        hoverRadius: 0, // Hide points on hover
      },
    },
  };


  const CompletedProjectData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly',
        data: [100, 120, 300, 200, 350, 400, 300, 270, 370, 390, 350, null, null],
        borderColor: 'rgb(8, 143, 143)',
        backgroundColor: 'rgba(8, 143, 143 , .05)',
        fill: true,
        tension: 0.4, // Add tension for smooth curves
      },
    ],
  };
  const CompletedProjectOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        grid: {
          display: false, // Remove horizontal grid lines
        },
        ticks: {
          display: false, // Hide y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    elements: {
      point: {
        radius: 0, // Hide points on the line
        hoverRadius: 0, // Hide points on hover
      },
    },
  };
  const dataHiredSet = [250, 210, 340, 400, 380, 420];
  const lastDataIndex = dataHiredSet.length - 1;
  const pointRadiusArray = [];

  for (let i = 0; i < dataHiredSet.length; i++) {
    if (i === lastDataIndex) {
      pointRadiusArray.push(6);
    } else {
      pointRadiusArray.push(undefined);
    }
  }
  const lineHiredData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly',
        data: dataHiredSet,
        borderColor: 'rgb(8, 143, 143)',
        backgroundColor: 'rgba(8, 143, 143 , .05)',
        fill: true,
        tension: 0.4, // Add tension for smooth curves
        pointRadius: pointRadiusArray,
        pointStyle: 'point',
      },
    ],
  };
  const lineHiredOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          display: false, // Hide x-axis labels (days)
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          display: true, // Show y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        position: 'top', // Keep the legend labels
        labels: {
          padding: 20, // Add padding to the legend labels
          align: 'center',
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 1, // Hide points on the line
        hoverRadius: 5, // Hide points on hover
      },
    },
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <h2 className="section-head mb-4">{t("overview")} </h2>
          <div className="overview-card-wrapper mb-5">
            <div className="overview-card active">
              <div>
                <h4 className="overview-card-subhead">{t("income")}</h4>
                <h3 className="overview-card-heading mb-0">
                  {vendorDashboard?.revenue_total}
                </h3>
              </div>
              <span className="over-icon">
                <IoTrendingUpSharp />
              </span>
            </div>
            <div className="overview-card">
              <div>
                <h4 className="overview-card-subhead">Total Developers</h4>
                <h3 className="overview-card-heading mb-0">
                  20
                </h3>
              </div>
              <span className="over-icon">
                <IoTrendingUpSharp />
              </span>
            </div>
            <div className="overview-card">
              <div>
                <h4 className="overview-card-subhead">Invoice Raised</h4>
                <h3 className="overview-card-heading mb-0">
                  140
                </h3>
              </div>
              <span className="over-icon">
                <IoTrendingUpSharp />
              </span>
            </div>
            <div className="overview-card">
              <div>
                <h4 className="overview-card-subhead">Total Projects</h4>
                <h3 className="overview-card-heading mb-0">
                  30
                </h3>
              </div>
              <span className="over-icon">
                <IoTrendingUpSharp />
              </span>
            </div>
          </div>
          <div>
            <Row>
              <Col xxl={6} lg={12} className="mb-4">
                <div className="card-box h-100">
                  <h3 className="section-head pb-0 border-0 mb-4">Total Revenue</h3>
                  <div className="revenue-graph">
                    <Line data={lineData} options={lineOptions} />
                  </div>
                </div>
              </Col>
              <Col xxl={6} lg={12} className="mb-4">
                <div className="card-box">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-head pb-0 border-0 mb-0">Activity Logs</h3>
                  </div>
                  <div className="">
                    <div className="table-responsive activity-log-table">
                      <table className="table table-ui-custom">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Activity</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">Amazon posted a job</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">1 min ago</td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">David Williams is shortlisted for figma ui job</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">2 mins ago</td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">John Doe wants to edit his profile</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">3 mins ago</td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">You have approved Smith application</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">10 mins ago</td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">Rohit's timesheet has been approved by Amazon for AI Bot project</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">10:30 AM</td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">Amazon posted a job</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">15 min ago</td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                            <td className="time-table-data text-start font-14 fw-normal">Rohit's timesheet has been approved by Amazon for AI Bot project</td>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">10:30 AM</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <Row>
              <Col md={6} className="mb-4">
                <div className="mb-3">
                  <Row>
                    <Col md={6}>
                      <div className="status-card d-flex justify-content-between align-items-center">
                        {/* <div className="icon-status-card">
                                                <GoProjectRoadmap />
                                            </div> */}
                        <div>
                          <h3>Total Projects</h3>
                          <div>
                            <p className="status-text-card">147 <span className="increase-text">+10</span></p>
                          </div>
                        </div>
                        <div>
                          <div className="graph-status">
                            <Line data={TotalProjectData} options={TotalProjectOptions} />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="status-card d-flex justify-content-between align-items-center">
                        {/* <div className="icon-status-card">
                                                <FaCircleCheck />
                                            </div> */}
                        <div>
                          <h3>Completed Projects</h3>
                          <div>
                            <p className="status-text-card">50 <span className="increase-text">+30</span></p>
                          </div>
                        </div>
                        <div>
                          <div className="graph-status">
                            <Line data={CompletedProjectData} options={CompletedProjectOptions} />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="card-box">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-head pb-0 border-0 mb-0">Projects</h3>
                    <Form.Select className="common-field w-auto font-14">
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </Form.Select>
                  </div>
                  <div className="hired-dev-graph">
                    <Line data={lineHiredData} options={lineHiredOptions} />
                  </div>
                </div>
              </Col>
              <Col md={6} className="mb-4">
                <div className="card-box">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="section-head pb-0 border-0 mb-0">Ongoing Projects</h3>
                  </div>
                  <div className="">
                    <div className="table-responsive activity-log-table ongoing-project-table">
                      <table className="table table-ui-custom">
                        <thead>
                          <tr>
                            <th className="white-nowrap">Project Name</th>
                            <th className="white-nowrap">Client Name</th>
                            <th className="white-nowrap">Hired Developers</th>
                            <th className="white-nowrap">Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">Need Full stack MERN developer</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg2} />
                                <img src={devImg3} />
                                <img src={devImg} />
                                <img src={devImg2} />
                                <span>7+</span>
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              Remote
                            </td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">Node js developer</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg3} />
                                <img src={devImg2} />
                                <img src={devImg} />
                                <img src={devImg3} />
                                <span>1+</span>
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              Hyrid
                            </td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">Need Full stack MERN developer</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg2} />
                                <img src={devImg3} />
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              Remote
                            </td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">React js developer</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg3} />
                                <img src={devImg3} />
                                <img src={devImg2} />
                                <img src={devImg} />
                                <span>10+</span>
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              Remote
                            </td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">Figma to UI</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg2} />
                                <img src={devImg3} />
                                <img src={devImg2} />
                                <img src={devImg} />
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              On Site
                            </td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">AI Bot Project</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg} />
                                <img src={devImg2} />
                                <img src={devImg3} />
                                <img src={devImg} />
                                <span>7+</span>
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              Remote
                            </td>
                          </tr>
                          <tr>
                            <td className="time-table-data text-start font-14 fw-normal white-nowrap">AI Bot Project</td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <img src={clientImg} className="project-client" />
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              <div className="developer-stack">
                                <img src={devImg} />
                                <img src={devImg2} />
                                <img src={devImg3} />
                                <img src={devImg} />
                                <img src={devImg} />
                                <span>7+</span>
                              </div>
                            </td>
                            <td className="time-table-data text-start font-14 fw-normal">
                              Remote
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom-grey">
            <h2 className="section-head-sub">
             List of Developers
            </h2>
          </div>
          <div className="developers-list mb-3">
            {vendorDashboard?.all_developers?.length > 0 ? (
              <>
                {vendorDashboard?.all_developers?.map((item, index) => {
                  return (
                    <div
                      className="developer-card"
                      key={index}
                      onClick={() => handleCardClick(item?.id)}
                    >
                      <div className="user-imgbx">
                        <img
                          src={
                            item?.profile_picture
                              ? item?.profile_picture
                              : userImg
                          }
                          className="user-img"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="user-name">{item?.name}</h3>
                        {/* <p className="designation-user">Front End Designer</p> */}
                        <p className="email-user">{item?.email}</p>
                        <ul className="social-icons">
                          {item?.github_url && (
                            <li>
                              <Link to={item?.github_url}>
                                <FaGithub />
                              </Link>
                            </li>
                          )}
                          {item?.linkedin_url && (
                            <li>
                              <Link to={item?.linkedin_url}>
                                <FaLinkedin />
                              </Link>
                            </li>
                          )}
                          {/* <li>
                                                <Link to={"#"}><MdEmail /></Link>
                                            </li> */}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <NoDataFound />
            )}
          </div>
          {vendorDashboard?.all_developers?.length > 4 ? (
            <div className="my-2 text-center">
              <Link to={"/list-all-developers"} className="link-text-dark">
                {t("seeAll")}
              </Link>
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom-grey">
            <h2 className="section-head-sub">{t("listOfRentedDevelopers")}</h2>
          </div>
          <div className="developers-list">
            {vendorDashboard?.rented_developers?.length > 0 ? (
              <>
                {vendorDashboard?.rented_developers?.map((value, index) => {
                  return (
                    <div
                      className="developer-card"
                      key={index}
                      onClick={() => handleCardClick(value?.id)}
                    >
                      <div className="user-imgbx">
                        <img
                          src={
                            value?.profile_picture
                              ? value?.profile_picture
                              : userImg
                          }
                          className="user-img"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="user-name">{value?.name}</h3>
                        {/* <p className="designation-user">Front End Designer</p> */}
                        <p className="email-user">{value?.email}</p>
                        {/* <ul className="social-icons">
                            <li>
                                <Link to={"#"}><FaGithub /></Link>
                            </li>
                            <li>
                                <Link to={"#"}><FaLinkedin /></Link>
                            </li>
                            <li>
                                <Link to={"#"}><MdEmail /></Link>
                            </li>
                        </ul> */}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <NoDataFound />
            )}
          </div>
          {vendorDashboard?.rented_developers?.length > 4 ? (
            <div className="text-center ">
              <Link to={"/all-rented-developers"} className="link-text-dark">
                {t("seeAll")}
              </Link>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
export default VendorDashboard;
