const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
var port = process.env.PORT || 8080

const app = express();

//view engine setup
app.engine('handlebars', exphbs({
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/"
}));
app.set('view engine', 'handlebars');
//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render('contact');
});
app.post('/send', (req,res) => {
    const output = 
    `<h1>Thank you for using our service</h1>
    <h3>Contact details</h3>
    <h4>
      <div>Name: ${req.body.name}</div>
      <div>College: ${req.body.company}</div>
      <div>Email: ${req.body.email}</div>
      <div>Phone: ${req.body.phone}</div>
    </h4>  
    <h3>Message</h3>
    <div> ${req.body.message}</div>`
    
    console.log(req.body);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        //port: 587,
        //secure: false, 
        auth: {
          user: 'binayaksadangi44@gmail.com', //Set your sender email address
          pass: '********', //Give your password for uuthentication
        },
        /*tls: {
            rejectUnauthorized: false
        }*/
      });

      var mailoption = {
        from: 'binayaksadangi44@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Node test", // Subject line
        //text: "Hello world?", // plain text body
        html: output, // html body
      }
    
      // send mail with defined transport object
      transporter.sendMail(mailoption, (err) => {
        if(err) {
          console.log(err);
        }
        else {
          console.log('Email Sent');
        }
      });
    
      //console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.render('thankyou');
});
app.get('/views/contact.handlebars',(req,res)=>{
  res.render('contact');
})

app.listen(port, () => {
    console.log('server started');
    
});