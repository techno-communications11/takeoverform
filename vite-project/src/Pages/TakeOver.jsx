// // import React from 'react';
// // import NavbarCompo from '../Component/NavbarCompo/NavbarCompo';
// // import { Box, TextField, MenuItem, Button } from '@mui/material';

// // const yesNoOptions = [
// //   { value: 'yes', label: 'Yes' },
// //   { value: 'no', label: 'No' },
// // ];

// // const TakeOver = () => {
// //   return (
// //     <div>
// //       <NavbarCompo />
// //       <div className="container mt-4">
// //         <h3 className="mb-4">Take Over Form</h3>
// //         <form>
// //           <div className="row">
// //             {/* Row-wise fields */}
// //             {[
// //               { label: 'Name', name: 'name' },
// //               { label: 'Store Name', name: 'storeName' },
// //               { label: 'Take Over Date', name: 'takeOverDate', type: 'date' },
// //               { label: 'Alarm Code', name: 'alarmCode' },
// //               { label: 'WiFi Name', name: 'wifiName' },
// //               { label: 'WiFi Code', name: 'wifiCode' },
// //               { label: 'Safe Box Code', name: 'safeBoxCode' },
// //               { label: 'Lunch Box Code', name: 'lunchBoxCode' },
// //               { label: 'Grill/Main Door Code', name: 'doorCode' },
// //               { label: 'Dumpster Lock Code/Key', name: 'dumpsterCode' },
// //               { label: 'Number of Citrix Computers', name: 'citrixCount', type: 'number' },
// //               { label: 'Number of Yuni Keys', name: 'yuniKeys', type: 'number' },
// //               { label: 'iPhone 11 IMEI', name: 'iphone11', helper: '15 digits' },
// //               { label: 'iPhone SE IMEI', name: 'iphoneSE', helper: '15 digits' },
// //               { label: 'iPhone 12 IMEI', name: 'iphone12', helper: '15 digits' },
// //               { label: 'iPhone 13 IMEI', name: 'iphone13', helper: '15 digits' },
// //               { label: 'iPhone 15 IMEI', name: 'iphone15', helper: '15 digits' },
// //               { label: 'iPhone 16 IMEI', name: 'iphone16', helper: '15 digits' },
// //             ].map((field, i) => (
// //               <div className="col-md-6 mb-3" key={i}>
// //                 <TextField
// //                   fullWidth
// //                   label={field.label}
// //                   name={field.name}
// //                   type={field.type || 'text'}
// //                   helperText={field.helper || ''}
// //                   variant="outlined"
// //                 />
// //               </div>
// //             ))}

// //             {/* Dropdowns */}
// //             {[
// //               { label: 'GSP/Ensurity Tracker', name: 'gsp' },
// //               { label: 'Credit Card Setup', name: 'creditCard' },
// //               { label: 'Next Camera Setup & Linked', name: 'camera' },
// //               { label: 'Inventory Audit Done?', name: 'inventoryAudit' },
// //               { label: 'Shipment Delivered?', name: 'shipment' },
// //             ].map((dropdown, i) => (
// //               <div className="col-md-6 mb-3" key={dropdown.name}>
// //                 <TextField
// //                   fullWidth
// //                   select
// //                   label={dropdown.label}
// //                   name={dropdown.name}
// //                   defaultValue=""
// //                   variant="outlined"
// //                 >
// //                   {yesNoOptions.map((option) => (
// //                     <MenuItem key={option.value} value={option.value}>
// //                       {option.label}
// //                     </MenuItem>
// //                   ))}
// //                 </TextField>
// //               </div>
// //             ))}

// //             {/* File Upload */}
// //             <div className="col-md-12 mb-4">
// //               <Box>
// //                 <label className="form-label">Upload Store Images</label>
// //                 <input
// //                   type="file"
// //                   className="form-control"
// //                   name="storeImages"
// //                   multiple
// //                   accept="image/*"
// //                 />
// //               </Box>
// //             </div>

// //             {/* Submit Button */}
// //             <div className="col-12 text-end">
// //               <Button variant="contained" color="primary">
// //                 Submit Form
// //               </Button>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TakeOver;




// import React from 'react';
// import NavbarCompo from '../Component/NavbarCompo/NavbarCompo';
// import { Box, TextField, MenuItem, Button } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import imageCompression from 'browser-image-compression';
// import { addTakeoverEntryServices } from '../Services/takeover.services';

// const yesNoOptions = [
//     { value: 'yes', label: 'Yes' },
//     { value: 'no', label: 'No' },
// ];

// // IMEI field names
// const imeiFields = ['iphone11', 'iphoneSE', 'iphone12', 'iphone13', 'iphone15', 'iphone16'];

// // Validation schema
// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Required'),
//     storeName: Yup.string().required('Required'),
//     takeOverDate: Yup.string().required('Required'),
//     alarmCode: Yup.string().required('Required'),
//     wifiName: Yup.string().required('Required'),
//     wifiCode: Yup.string().required('Required'),
//     safeBoxCode: Yup.string().required('Required'),
//     lunchBoxCode: Yup.string().required('Required'),
//     doorCode: Yup.string().required('Required'),
//     dumpsterCode: Yup.string().required('Required'),
//     citrixCount: Yup.number().required('Required'),
//     yuniKeys: Yup.number().required('Required'),
//     ...Object.fromEntries(
//         imeiFields.map(field => [
//             field,
//             Yup.string()
//                 .required('Required')
//                 .matches(/^\d{15}$/, 'Must be exactly 15 digits'),
//         ])
//     ),
//     gsp: Yup.string().required('Required'),
//     creditCard: Yup.string().required('Required'),
//     camera: Yup.string().required('Required'),
//     inventoryAudit: Yup.string().required('Required'),
//     shipment: Yup.string().required('Required'),
//     storeImages: Yup.mixed().required('Please upload store images'),
// });

// const TakeOver = () => {
//     const initialValues = {
//         name: '',
//         storeName: '',
//         takeOverDate: '',
//         alarmCode: '',
//         wifiName: '',
//         wifiCode: '',
//         safeBoxCode: '',
//         lunchBoxCode: '',
//         doorCode: '',
//         dumpsterCode: '',
//         citrixCount: '',
//         yuniKeys: '',
//         iphone11: '',
//         iphoneSE: '',
//         iphone12: '',
//         iphone13: '',
//         iphone15: '',
//         iphone16: '',
//         gsp: '',
//         creditCard: '',
//         camera: '',
//         inventoryAudit: '',
//         shipment: '',
//         storeImages: null,
//     };

//     const handleSubmit = async (values) => {
//         try {
//             const files = values.storeImages;
//             const compressedImages = [];

//             for (let file of files) {
//                 const options = {
//                     maxSizeMB: 1,
//                     maxWidthOrHeight: 1024,
//                     useWebWorker: true,
//                 };
//                 const compressedFile = await imageCompression(file, options);
//                 compressedImages.push(compressedFile);
//             }
//             try {
//                 const response = await addTakeoverEntryServices(values);
//                 console.log("RESPONSE", response.data);
//             } catch (error) {
//                 console.log("ERROR", error.message)
//             }
//             // Submit form along with compressedImages
//             console.log('Form Values:', values);
//             console.log('Compressed Images:', compressedImages);
//             alert('Form submitted successfully!');
//         } catch (error) {
//             console.error('Image compression error:', error);
//         }
//     };

//     return (
//         <div>
//             <NavbarCompo />
//             <div className="container mt-4">
//                 <h3 className="mb-4">Take Over Form</h3>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ values, handleChange, setFieldValue, errors, touched }) => (
//                         <Form>
//                             <div className="row">
//                                 {[
//                                     { label: 'Name', name: 'name' },
//                                     { label: 'Store Name', name: 'storeName' },
//                                     { label: 'Take Over Date', name: 'takeOverDate', type: 'date' },
//                                     { label: 'Alarm Code', name: 'alarmCode' },
//                                     { label: 'WiFi Name', name: 'wifiName' },
//                                     { label: 'WiFi Code', name: 'wifiCode' },
//                                     { label: 'Safe Box Code', name: 'safeBoxCode' },
//                                     { label: 'Lunch Box Code', name: 'lunchBoxCode' },
//                                     { label: 'Grill/Main Door Code', name: 'doorCode' },
//                                     { label: 'Dumpster Lock Code/Key', name: 'dumpsterCode' },
//                                     { label: 'Number of Citrix Computers', name: 'citrixCount', type: 'number' },
//                                     { label: 'Number of Yuni Keys', name: 'yuniKeys', type: 'number' },
//                                     { label: 'iPhone 11 IMEI', name: 'iphone11' },
//                                     { label: 'iPhone SE IMEI', name: 'iphoneSE' },
//                                     { label: 'iPhone 12 IMEI', name: 'iphone12' },
//                                     { label: 'iPhone 13 IMEI', name: 'iphone13' },
//                                     { label: 'iPhone 15 IMEI', name: 'iphone15' },
//                                     { label: 'iPhone 16 IMEI', name: 'iphone16' },
//                                 ].map((field, i) => (
//                                     <div className="col-md-6 mb-3" key={i}>
//                                         {
//                                             field.type === 'date' ?
//                                                 <TextField
//                                                     fullWidth
//                                                     // label={field.label}
//                                                     name={field.name}
//                                                     type={field.type || 'text'}
//                                                     variant="outlined"
//                                                     value={values[field.name]}
//                                                     onChange={handleChange}
//                                                     error={touched[field.name] && Boolean(errors[field.name])}
//                                                     helperText={touched[field.name] && errors[field.name]}
//                                                 /> : <TextField
//                                                     fullWidth
//                                                     label={field.label}
//                                                     name={field.name}
//                                                     type={field.type || 'text'}
//                                                     variant="outlined"
//                                                     value={values[field.name]}
//                                                     onChange={handleChange}
//                                                     error={touched[field.name] && Boolean(errors[field.name])}
//                                                     helperText={touched[field.name] && errors[field.name]}
//                                                 />
//                                         }
//                                     </div>
//                                 ))}

//                                 {/* Dropdowns */}
//                                 {[
//                                     { label: 'GSP/Ensurity Tracker', name: 'gsp' },
//                                     { label: 'Credit Card Setup', name: 'creditCard' },
//                                     { label: 'Next Camera Setup & Linked', name: 'camera' },
//                                     { label: 'Inventory Audit Done?', name: 'inventoryAudit' },
//                                     { label: 'Shipment Delivered?', name: 'shipment' },
//                                 ].map((dropdown, i) => (
//                                     <div className="col-md-6 mb-3" key={dropdown.name}>
//                                         <TextField
//                                             select
//                                             fullWidth
//                                             label={dropdown.label}
//                                             name={dropdown.name}
//                                             variant="outlined"
//                                             value={values[dropdown.name]}
//                                             onChange={handleChange}
//                                             error={touched[dropdown.name] && Boolean(errors[dropdown.name])}
//                                             helperText={touched[dropdown.name] && errors[dropdown.name]}
//                                         >
//                                             {yesNoOptions.map((option) => (
//                                                 <MenuItem key={option.value} value={option.value}>
//                                                     {option.label}
//                                                 </MenuItem>
//                                             ))}
//                                         </TextField>
//                                     </div>
//                                 ))}

//                                 {/* File Upload */}
//                                 <div className="col-md-12 mb-4">
//                                     <Box>
//                                         <label className="form-label">Upload Store Images</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             name="storeImages"
//                                             multiple
//                                             accept="image/*"
//                                             onChange={(event) =>
//                                                 setFieldValue('storeImages', event.currentTarget.files)
//                                             }
//                                         />
//                                         {touched.storeImages && errors.storeImages && (
//                                             <div className="text-danger mt-1">{errors.storeImages}</div>
//                                         )}
//                                     </Box>
//                                 </div>

//                                 {/* Submit Button */}
//                                 <div className="col-12 text-end">
//                                     <Button variant="contained" color="primary" type="submit">
//                                         Submit Form
//                                     </Button>
//                                 </div>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default TakeOver;



// import React, { useState } from 'react';
// import NavbarCompo from '../Component/NavbarCompo/NavbarCompo';
// import { Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import { addTakeoverEntryServices } from '../Services/takeover.services';
// import { toast, ToastContainer } from 'react-toastify';

// const yesNoOptions = [
//     { value: 'yes', label: 'Yes' },
//     { value: 'no', label: 'No' },
// ];

// const imeiFields = ['iphone11', 'iphoneSE', 'iphone12', 'iphone13', 'iphone15', 'iphone16'];

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Required'),
//     storeName: Yup.string().required('Required'),
//     takeOverDate: Yup.string().required('Required'),
//     alarmCode: Yup.string().required('Required'),
//     wifiName: Yup.string().required('Required'),
//     wifiCode: Yup.string().required('Required'),
//     safeBoxCode: Yup.string().required('Required'),
//     lunchBoxCode: Yup.string().required('Required'),
//     doorCode: Yup.string().required('Required'),
//     dumpsterCode: Yup.string().required('Required'),
//     citrixCount: Yup.number().required('Required'),
//     yuniKeys: Yup.number().required('Required'),
//     ...Object.fromEntries(
//         imeiFields.map(field => [
//             field,
//             Yup.string()
//                 .required('Required')
//                 .matches(/^\d{15}$/, 'Must be exactly 15 digits'),
//         ])
//     ),
//     gsp: Yup.string().required('Required'),
//     creditCard: Yup.string().required('Required'),
//     camera: Yup.string().required('Required'),
//     inventoryAudit: Yup.string().required('Required'),
//     shipment: Yup.string().required('Required'),
//     storeImages: Yup.array().min(1, 'Please upload at least one image').required('Required'),
// });

// const TakeOver = () => {
//     const [isUploading, setIsUploading] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const initialValues = {
//         name: '',
//         storeName: '',
//         takeOverDate: '',
//         alarmCode: '',
//         wifiName: '',
//         wifiCode: '',
//         safeBoxCode: '',
//         lunchBoxCode: '',
//         doorCode: '',
//         dumpsterCode: '',
//         citrixCount: '',
//         yuniKeys: '',
//         iphone11: '',
//         iphoneSE: '',
//         iphone12: '',
//         iphone13: '',
//         iphone15: '',
//         iphone16: '',
//         gsp: '',
//         creditCard: '',
//         camera: '',
//         inventoryAudit: '',
//         shipment: '',
//         storeImages: [],
//     };



//     const uploadImagesToCloudinary = async (files) => {
//         const uploadedUrls = [];
//         setIsUploading(true);

//         for (let file of files) {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('upload_preset', 'ml_default'); // replace
//             formData.append('cloud_name', 'deywkct4u'); // replace

//             try {
//                 const res = await fetch('https://api.cloudinary.com/v1_1/deywkct4u/image/upload', {
//                     method: 'POST',
//                     body: formData,
//                 });
//                 const data = await res.json();
//                 uploadedUrls.push(data.secure_url);
//             } catch (error) {
//                 console.error('Cloudinary upload error:', error);
//             }
//         }

//         setIsUploading(false);
//         return uploadedUrls;
//     };

//     const handleSubmit = async (values, { resetForm }) => {
//         setLoading(true);
//         try {
//             const response = await addTakeoverEntryServices(values);
//             if (response.data.status === 200) {
//                 toast.success('Form submitted successfully!')
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error('Submission Error:', error.message);
//             alert('Error submitting form.');
//         } finally {
//             resetForm();
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <ToastContainer/>
//             <NavbarCompo />
//             <div className="container mt-4">
//                 <h3 className="mb-4">Take Over Form</h3>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ values, handleChange, setFieldValue, errors, touched }) => (
//                         <Form>
//                             <div className="row">
//                                 {[
//                                     { label: 'Name', name: 'name' },
//                                     { label: 'Store Name', name: 'storeName' },
//                                     { label: 'Take Over Date', name: 'takeOverDate', type: 'date' },
//                                     { label: 'Alarm Code', name: 'alarmCode' },
//                                     { label: 'WiFi Name', name: 'wifiName' },
//                                     { label: 'WiFi Code', name: 'wifiCode' },
//                                     { label: 'Safe Box Code', name: 'safeBoxCode' },
//                                     { label: 'Lunch Box Code', name: 'lunchBoxCode' },
//                                     { label: 'Grill/Main Door Code', name: 'doorCode' },
//                                     { label: 'Dumpster Lock Code/Key', name: 'dumpsterCode' },
//                                     { label: 'Number of Citrix Computers', name: 'citrixCount', type: 'number' },
//                                     { label: 'Number of Yuni Keys', name: 'yuniKeys', type: 'number' },
//                                     { label: 'iPhone 11 IMEI', name: 'iphone11' },
//                                     { label: 'iPhone SE IMEI', name: 'iphoneSE' },
//                                     { label: 'iPhone 12 IMEI', name: 'iphone12' },
//                                     { label: 'iPhone 13 IMEI', name: 'iphone13' },
//                                     { label: 'iPhone 15 IMEI', name: 'iphone15' },
//                                     { label: 'iPhone 16 IMEI', name: 'iphone16' },
//                                 ].map((field, i) => (
//                                     <div className="col-md-6 mb-3" key={i}>
//                                         <TextField
//                                             fullWidth
//                                             label={field.type !== 'date' ? field.label : ''}
//                                             name={field.name}
//                                             type={field.type || 'text'}
//                                             variant="outlined"
//                                             value={values[field.name]}
//                                             onChange={handleChange}
//                                             error={touched[field.name] && Boolean(errors[field.name])}
//                                             helperText={touched[field.name] && errors[field.name]}
//                                             InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
//                                         />
//                                     </div>
//                                 ))}

//                                 {[
//                                     { label: 'GSP/Ensurity Tracker', name: 'gsp' },
//                                     { label: 'Credit Card Setup', name: 'creditCard' },
//                                     { label: 'Next Camera Setup & Linked', name: 'camera' },
//                                     { label: 'Inventory Audit Done?', name: 'inventoryAudit' },
//                                     { label: 'Shipment Delivered?', name: 'shipment' },
//                                 ].map((dropdown) => (
//                                     <div className="col-md-6 mb-3" key={dropdown.name}>
//                                         <TextField
//                                             select
//                                             fullWidth
//                                             label={dropdown.label}
//                                             name={dropdown.name}
//                                             variant="outlined"
//                                             value={values[dropdown.name]}
//                                             onChange={handleChange}
//                                             error={touched[dropdown.name] && Boolean(errors[dropdown.name])}
//                                             helperText={touched[dropdown.name] && errors[dropdown.name]}
//                                         >
//                                             {yesNoOptions.map((option) => (
//                                                 <MenuItem key={option.value} value={option.value}>
//                                                     {option.label}
//                                                 </MenuItem>
//                                             ))}
//                                         </TextField>
//                                     </div>
//                                 ))}

//                                 {/* File Upload */}
//                                 <div className="col-md-12 mb-4">
//                                     <Box>
//                                         <label className="form-label">Upload Store Images</label>
//                                         <input
//                                             type="file"
//                                             className="form-control"
//                                             multiple
//                                             accept="image/*"
//                                             onChange={async (event) => {
//                                                 const files = event.currentTarget.files;
//                                                 if (files.length > 0) {
//                                                     const uploadedUrls = await uploadImagesToCloudinary(files);
//                                                     setFieldValue('storeImages', uploadedUrls);
//                                                 }
//                                             }}
//                                         />
//                                         {touched.storeImages && errors.storeImages && (
//                                             <div className="text-danger mt-1">{errors.storeImages}</div>
//                                         )}
//                                     </Box>
//                                     {isUploading && (
//                                         <div className="text-primary mt-2">
//                                             <CircularProgress size={24} />
//                                             <span className="ms-2">Uploading images...</span>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Submit Button */}
//                                 <div className="col-12 text-end">
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         type="submit"
//                                         disabled={loading}
//                                     >
//                                         {loading ? 'Uploading...' : 'Submit Form'}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default TakeOver;


import React, { useState } from 'react';
import NavbarCompo from '../Component/NavbarCompo/NavbarCompo';
import { Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addTakeoverEntryServices } from '../Services/takeover.services';
import { toast, ToastContainer } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

const imeiFields = ['iphone11', 'iphoneSE', 'iphone12', 'iphone13', 'iphone15', 'iphone16'];

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    storeName: Yup.string().required('Required'),
    takeOverDate: Yup.string().required('Required'),
    alarmCode: Yup.string().required('Required'),
    wifiName: Yup.string().required('Required'),
    wifiCode: Yup.string().required('Required'),
    safeBoxCode: Yup.string().required('Required'),
    lunchBoxCode: Yup.string().required('Required'),
    doorCode: Yup.string().required('Required'),
    dumpsterCode: Yup.string().required('Required'),
    citrixCount: Yup.number().typeError('Only numbers allowed').required('Required'),
    yuniKeys: Yup.number().typeError('Only numbers allowed').required('Required'),
    // ...Object.fromEntries(
    //     imeiFields.map(field => [
    //         field,
    //         Yup.string()
    //             .required('Required')
    //             .matches(/^\d{15}$/, 'Must be exactly 15 digits'),
    //     ])
    // ),
    gsp: Yup.string().required('Required'),
    creditCard: Yup.string().required('Required'),
    camera: Yup.string().required('Required'),
    inventoryAudit: Yup.string().required('Required'),
    shipment: Yup.string().required('Required'),
    storeImages: Yup.array().min(1, 'Please upload at least one image').required('Required'),
});

const TakeOver = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: '',
        storeName: '',
        cashinstore: '',
        takeOverDate: '',
        alarmCode: '',
        wifiName: '',
        wifiCode: '',
        safeBoxCode: '',
        lunchBoxCode: '',
        doorCode: '',
        dumpsterCode: '',
        citrixCount: '',
        yuniKeys: '',
        iphone11: '',
        iphoneSE: '',
        iphone12: '',
        iphone13: '',
        iphone15: '',
        iphone16: '',
        gsp: '',
        creditCard: '',
        camera: '',
        inventoryAudit: '',
        shipment: '',
        storeImages: [],
    };

    const uploadImagesToCloudinary = async (files) => {
        const uploadedUrls = [];
        setIsUploading(true);

        for (let file of files) {
            // Compress the image before uploading
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,        // Maximum size in MB
                maxWidthOrHeight: 1920,  // Optional: limit dimensions
                useWebWorker: true,
            });
            const formData = new FormData();
            formData.append('file', compressedFile);
            formData.append('upload_preset', 'ml_default');
            formData.append('cloud_name', 'deywkct4u');

            try {
                const res = await fetch('https://api.cloudinary.com/v1_1/deywkct4u/image/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                uploadedUrls.push(data.secure_url);
            } catch (error) {
                console.error('Cloudinary upload error:', error);
            }
        }

        setIsUploading(false);
        return uploadedUrls;
    };

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const response = await addTakeoverEntryServices(values);
            if (response.data.status === 200) {
                toast.success('Form submitted successfully!');
            }
        } catch (error) {
            console.error('Submission Error:', error.message);
            alert('Error submitting form.');
        } finally {
            resetForm();
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer />
            <NavbarCompo />
            <div className="container mt-4">
                <h3 className="mb-4">Take Over Form</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, setFieldValue, errors, touched }) => (
                        <Form>
                            <div className="row">
                                {[
                                    { label: 'Name', name: 'name' },
                                    { label: 'Store Name', name: 'storeName' },
                                    { label: 'Cash in Store', name: 'cashinstore' },
                                    { label: 'Take Over Date', name: 'takeOverDate', type: 'date' },
                                    { label: 'Alarm Code', name: 'alarmCode' },
                                    { label: 'WiFi Name', name: 'wifiName' },
                                    { label: 'WiFi Code', name: 'wifiCode' },
                                    { label: 'Safe Box Code', name: 'safeBoxCode' },
                                    { label: 'Lunch Box Code', name: 'lunchBoxCode' },
                                    { label: 'Grill/Main Door Code', name: 'doorCode' },
                                    { label: 'Dumpster Lock Code/Key', name: 'dumpsterCode' },
                                    { label: 'Number of Citrix Computers', name: 'citrixCount', type: 'number' },
                                    { label: 'Number of YubiKey', name: 'yuniKeys', type: 'number' },
                                    { label: 'iPhone 11 IMEI', name: 'iphone11', type: 'text' },
                                    { label: 'iPhone SE IMEI', name: 'iphoneSE', type: 'text' },
                                    { label: 'iPhone 12 IMEI', name: 'iphone12', type: 'text' },
                                    { label: 'iPhone 13 IMEI', name: 'iphone13', type: 'text' },
                                    { label: 'iPhone 15 IMEI', name: 'iphone15', type: 'text' },
                                    { label: 'iPhone 16 IMEI', name: 'iphone16', type: 'text' },
                                    { label: 'iwatch (1) IMEI', name: 'iwatch(1)', type: 'text' },
                                    { label: 'iwatch (2) IMEI', name: 'iwatch(2)', type: 'text' },
                                ].map((field, i) => (
                                    <div className="col-md-6 mb-3" key={i}>
                                        <TextField
                                            fullWidth
                                            label={field.type !== 'date' ? field.label : ''}
                                            name={field.name}
                                            type={field.type || 'text'}
                                            value={values[field.name]}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (field.type === 'number') {
                                                    if (/^\d*$/.test(value)) {
                                                        setFieldValue(field.name, value);
                                                    }
                                                } else {
                                                    handleChange(e);
                                                }
                                            }}
                                            variant="outlined"
                                            error={touched[field.name] && Boolean(errors[field.name])}
                                            helperText={touched[field.name] && errors[field.name]}
                                            InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                        />
                                    </div>
                                ))}

                                {[
                                    { label: 'GSP/Ensurity Tracker', name: 'gsp' },
                                    { label: 'Credit Card Setup', name: 'creditCard' },
                                    { label: 'Next Camera Setup & Linked', name: 'camera' },
                                    { label: 'Inventory Audit Done?', name: 'inventoryAudit' },
                                    { label: 'Shipment Delivered?', name: 'shipment' },
                                ].map((dropdown) => (
                                    <div className="col-md-6 mb-3" key={dropdown.name}>
                                        <TextField
                                            select
                                            fullWidth
                                            label={dropdown.label}
                                            name={dropdown.name}
                                            value={values[dropdown.name]}
                                            onChange={handleChange}
                                            variant="outlined"
                                            error={touched[dropdown.name] && Boolean(errors[dropdown.name])}
                                            helperText={touched[dropdown.name] && errors[dropdown.name]}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                ))}

                                <div className="col-md-12 mb-4">
                                    <Box>
                                        <label className="form-label">Upload Store Images</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            multiple
                                            accept="image/*"
                                            onChange={async (event) => {
                                                const files = event.currentTarget.files;
                                                if (files.length > 0) {
                                                    const uploadedUrls = await uploadImagesToCloudinary(files);
                                                    setFieldValue('storeImages', uploadedUrls);
                                                }
                                            }}
                                        />
                                        {touched.storeImages && errors.storeImages && (
                                            <div className="text-danger mt-1">{errors.storeImages}</div>
                                        )}
                                    </Box>
                                    {isUploading && (
                                        <div className="text-primary mt-2">
                                            <CircularProgress size={24} />
                                            <span className="ms-2">Uploading images...</span>
                                        </div>
                                    )}
                                </div>

                                <div className="col-12 text-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Uploading...' : 'Submit Form'}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TakeOver;
