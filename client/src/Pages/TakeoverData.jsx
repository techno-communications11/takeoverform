// import React, { useEffect, useState } from 'react';
// import { getAllTakeoverEntryServices } from '../Services/takeover.services';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// function TakeoverData() {
//     const [takeoverData, setTakeoverData] = useState([]);

//     const getAllTakeoverData = async () => {
//         try {
//             const response = await getAllTakeoverEntryServices();
//             console.log(response.data.data);
//             setTakeoverData(response.data.data);
//         } catch (error) {
//             console.log("ERROR", error.message);
//         }
//     };

//     useEffect(() => {
//         getAllTakeoverData();
//     }, []);

//     const downloadExcel = () => {
//         const formattedData = takeoverData.map(item => ({
//             Name: item.name,
//             Store: item.storeName,
//             "Take Over Date": item.takeOverDate,
//             "Alarm Code": item.alarmCode,
//             "WiFi Name": item.wifiName,
//             "WiFi Code": item.wifiCode,
//             "Safe Box Code": item.safeBoxCode,
//             "Lunch Box Code": item.lunchBoxCode,
//             "Door Code": item.doorCode,
//             "Dumpster Code": item.dumpsterCode,
//             "Citrix Count": item.citrixCount,
//             "Yuni Keys": item.yuniKeys,
//             "iPhone 11": item.iphone11,
//             "iPhone SE": item.iphoneSE,
//             "iPhone 12": item.iphone12,
//             "iPhone 13": item.iphone13,
//             "iPhone 15": item.iphone15,
//             "iPhone 16": item.iphone16,
//             "GSP": item.gsp,
//             "Credit Card": item.creditCard,
//             "Camera": item.camera,
//             "Inventory Audit": item.inventoryAudit,
//             "Shipment": item.shipment,
//             "Store Image": item.storeImages?.[0] || '' // Pehli image
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(formattedData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Takeover Data");

//         const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//         const file = new Blob([excelBuffer], { type: "application/octet-stream" });
//         saveAs(file, "TakeoverData.xlsx");
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Takeover Data</h2>
//             <button onClick={downloadExcel} style={{ padding: "10px 20px", cursor: "pointer", background: "blue", color: "white", border: "none", borderRadius: "4px" }}>
//                 Download Excel
//             </button>
//         </div>
//     );
// }

// export default TakeoverData;


import React, { useEffect, useState } from 'react';
import { getAllTakeoverEntryServices } from '../Services/takeover.services';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AllImagesPreviews from '../Component/AllImagesPreviews/AllImagesPreviews';

function TakeoverData() {
    const [takeoverData, setTakeoverData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllTakeoverData = async () => {
        setLoading(true);
        try {
            const response = await getAllTakeoverEntryServices();
            setTakeoverData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log("ERROR", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllTakeoverData();
    }, []);

    const downloadExcel = () => {
        const formattedData = takeoverData.map(item => ({
            Name: item.name,
            Store: item.storeName,
            "Take Over Date": item.takeOverDate,
            "Alarm Code": item.alarmCode,
            "WiFi Name": item.wifiName,
            "WiFi Code": item.wifiCode,
            "Safe Box Code": item.safeBoxCode,
            "Lunch Box Code": item.lunchBoxCode,
            "Door Code": item.doorCode,
            "Dumpster Code": item.dumpsterCode,
            "Citrix Count": item.citrixCount,
            "Yuni Keys": item.yuniKeys,
            "iPhone 11": item.iphone11,
            "iPhone SE": item.iphoneSE,
            "iPhone 12": item.iphone12,
            "iPhone 13": item.iphone13,
            "iPhone 15": item.iphone15,
            "iPhone 16": item.iphone16,
            "GSP": item.gsp,
            "Credit Card": item.creditCard,
            "Camera": item.camera,
            "Inventory Audit": item.inventoryAudit,
            "Shipment": item.shipment,
            "Store Image": item.storeImages?.[0] || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Takeover Data");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, "TakeoverData.xlsx");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Takeover Data</h2>

            <div style={{ marginBottom: "15px" }}>
                <button onClick={downloadExcel} style={{ padding: "8px 16px", marginRight: "10px", background: "green", color: "white", border: "none", borderRadius: "4px" }}>
                    Download Excel
                </button>
                <button onClick={getAllTakeoverData} style={{ padding: "8px 16px", background: "orange", color: "white", border: "none", borderRadius: "4px" }}>
                    Refresh Data
                </button>
            </div>

            {/* <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}> */}
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <div className="table-responsive" style={{ overflowX: 'auto' }}>
    <table className='table table-bordered' style={{ whiteSpace: 'nowrap' }}>
        <thead style={{ background: "#f0f0f0" }}>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th style={{ width: "150px" }}>Store Name</th>
                <th style={{ width: "150px" }}>Cash in Store</th>
                <th>Takeover Date</th>
                <th>Alarm Code</th>
                <th>WiFi</th>
                <th>SafeBox Code</th>
                <th>LunchBox Code</th>
                <th>Door Code</th>
                <th>Dumpster Code</th>
                <th>Citrix</th>
                <th>Yubi Key</th>
                <th>iPhone 11</th>
                <th>iPhone SE</th>
                <th>iPhone 12</th>
                <th>iPhone 13</th>
                <th>iPhone 15</th>
                <th>iPhone 16</th>
                <th>GSP</th>
                <th>Credit Card</th>
                <th>Camera</th>
                <th>Inventory Audit</th>
                <th>Shipment</th>
                <th>Store Image</th>
            </tr>
        </thead>
        <tbody>
            {takeoverData.map((item, index) => (
                <tr key={item._id || index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td style={{ width: "150px" }}>{item.storeName}</td>
                    <td style={{ width: "150px" }}>{item.cashinstore}</td>
                    <td>{item.takeOverDate}</td>
                    <td>{item.alarmCode}</td>
                    <td>{item.wifiName} / {item.wifiCode}</td>
                    <td>{item.safeBoxCode}</td>
                    <td>{item.lunchBoxCode}</td>
                    <td>{item.doorCode}</td>
                    <td>{item.dumpsterCode}</td>
                    <td>{item.citrixCount}</td>
                    <td>{item.yuniKeys}</td>
                    <td>{item.iphone11}</td>
                    <td>{item.iphoneSE}</td>
                    <td>{item.iphone12}</td>
                    <td>{item.iphone13}</td>
                    <td>{item.iphone15}</td>
                    <td>{item.iphone16}</td>
                    <td>{item.gsp}</td>
                    <td>{item.creditCard}</td>
                    <td>{item.camera}</td>
                    <td>{item.inventoryAudit}</td>
                    <td>{item.shipment}</td>
                    <td>
                        <AllImagesPreviews item={item}/>
                    </td>
                    {/* <td>
                        {item.storeImages?.[0] ? (
                            <a href={item.storeImages[0]} target="_blank" rel="noopener noreferrer">View Image</a>
                        ) : "-"}
                    </td> */}
                </tr>
            ))}
        </tbody>
    </table>
</div>

            )}
        </div>
    );
}

export default TakeoverData;
