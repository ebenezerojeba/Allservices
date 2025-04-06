// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: '818be0001@smtp-brevo.com',
//     pass: 'zAJSZgnN31Ut6cWx',
//   },
// });

// export default transporter;



// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   name: 'Brevo',
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   secure: false, // Use false for TLS
//   auth: {
//     user: '818be0001@smtp-brevo.com',
//     pass: 'zAJSZgnN31Ut6cWx',
//   },
//   tls: {
//     // Use this only in development
//     rejectUnauthorized: false
//   }
// });

// // Verify connection configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('SMTP Connection Error:', error);
//   } else {
//     console.log('SMTP Server is ready');
//   }
// });

// export default transporter;


import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth:{
    user: 'ebenezer.idowu.ojeba@gmail.com',
    pass: 'qhkmyqmrnuyxritn',
  },
  tls: {
    rejectUnauthorized: false,
  }
})


export default transporter