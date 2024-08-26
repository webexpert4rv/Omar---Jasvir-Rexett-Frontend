import React from "react";
import chatImg from '../../assets/img/demo-img.jpg'
const ClientListing = () => {
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Clients
                    </h2>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="white-nowrap">Phone number</th>
                                    <th className="white-nowrap">Email address</th>
                                    {/* <th className="white-nowrap">Total clients</th>
                                    <th className="white-nowrap">Total vendors</th>
                                    <th className="white-nowrap">Total devs</th> */}
                                    <th className="white-nowrap">Active plan</th>
                                    <th className="white-nowrap">Price</th>
                                    <th className="white-nowrap">Plan date</th>
                                    <th className="white-nowrap">Plan expire</th>
                                    <th className="white-nowrap">Status</th>
                                    <th className="white-nowrap">Restrict Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            Quantum Dynamics Corp.
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle white-nowrap">info@quantumdynamics.com</td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    {/* <td className="font-14 align-middle">50</td>
                                    <td className="font-14 align-middle">10</td>
                                    <td className="font-14 align-middle">42</td> */}
                                    <td className="font-14 align-middle white-nowrap">Basic (Monthly)</td>
                                    <td className="font-14 align-middle">$9.99</td>
                                    <td className="font-14 align-middle white-nowrap">25-06-2024</td>
                                    <td className="font-14 align-middle white-nowrap">25-07-2024</td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            Apex Solutions Ltd
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle white-nowrap">contact@apexsolutions.com</td>
                                    <td className="font-14 align-middle">(555) 123-4567</td>
                                    {/* <td className="font-14 align-middle">50</td>
                                    <td className="font-14 align-middle">10</td>
                                    <td className="font-14 align-middle">42</td> */}
                                    <td className="font-14 align-middle white-nowrap">Basic (Annual)</td>
                                    <td className="font-14 align-middle">$100.99</td>
                                    <td className="font-14 align-middle white-nowrap">20-06-2024</td>
                                    <td className="font-14 align-middle white-nowrap">20-06-2025</td>
                                    <td className="font-14 align-middle">
                                        <span className="status-rejected">Inactive</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                                checked
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            Stellar Synergy LLC
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle white-nowrap">support@stellarsynergy.com</td>
                                    <td className="font-14 align-middle">(555) 345-6789</td>
                                    {/* <td className="font-14 align-middle">50</td>
                                    <td className="font-14 align-middle">10</td>
                                    <td className="font-14 align-middle">42</td> */}
                                    <td className="font-14 align-middle white-nowrap">Standard (Monthly)</td>
                                    <td className="font-14 align-middle">$19.99</td>
                                    <td className="font-14 align-middle white-nowrap">15-06-2024</td>
                                    <td className="font-14 align-middle white-nowrap">15-07-2024</td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            Horizon Enterprises Inc.
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle white-nowrap">inquiry@horizonenterprises.com</td>
                                    <td className="font-14 align-middle">(555) 456-7890</td>
                                    {/* <td className="font-14 align-middle">50</td>
                                    <td className="font-14 align-middle">10</td>
                                    <td className="font-14 align-middle">42</td> */}
                                    <td className="font-14 align-middle white-nowrap">Standard (Monthly)</td>
                                    <td className="font-14 align-middle">$19.99</td>
                                    <td className="font-14 align-middle white-nowrap">15-06-2024</td>
                                    <td className="font-14 align-middle white-nowrap">15-07-2024</td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ClientListing;