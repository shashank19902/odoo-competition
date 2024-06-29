const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const cors = require('cors');
const Authenticate = require('../middlewares/Authenticate')
const AuthenticateHODPrincipal = require('../middlewares/AuthenticateHODPrincipal')
const AddDBEntry = require('../middlewares/AddDBEntry');
require('../db/db')
const User = require("../models/register");
const projModel = require('../models/Projectlist')
const ForumList = require('../models/forum');
const CommentList = require('../models/Comments');
const MatModel = require('../models/MaterialSection')
const scards = require('../models/SubjectCardsModel')
const UserOtpVerification = require('../models/OtpVerification');
const CommunityList = require('../models/JoinCommunity');
const facultyList = require('../models/Addfaculty');
const AuthenticateFaculties = require('../middlewares/AuthenticateFaculties');
const AuthenticateLoggedIn = require('../middlewares/AuthenticateLoggedIn');

router.use(cors());

// generating access token for mail
const AccessToken = async () => {
  try {
    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken;
  } catch (error) {
    console.log(error);
  }
}

// const accessToken = AccessToken();



// Faculty Routes
router.post("/addFaculty", async (req, res) => {
  try {
    const { email,
      fname,
      lname,
      mobileNumber,
      shortName,
      college,
      department,
      role,
      password,
      cpassword,
      expertise,
      designation,
      linkedIn } = req.body;

    if (!fname || !lname || !email || !department || !college || !shortName || !mobileNumber || !password || !cpassword || !role || !expertise || !designation || !linkedIn) {
      res.status(422).json({ message: "Please fill all the details" });
    } else if (email.split('@')[1].toLowerCase() === 'charusat.ac.in') {
      const userExist = await facultyList.findOne({ email: email });

      if (userExist) {
        res.status(422).json({ message: "Faculty Already Exist with same email Id" });
      } else {

        if (password != cpassword) {
          res.status(422).json({ message: "Passwords not matching" });
        } else {
          const registerfaculty = new facultyList({ email, fname, lname, department, college, shortName, mobileNumber, role, expertise, designation, linkedIn, password, cpassword });
          // const userRegister = await registerUser.save();
          // console.log(userRegister);
          // res.status(200).json({ message: "User Added Successfully" });
          registerfaculty.save().then((result) => {
            console.log(result);
            res.status(200).json({ message: "Faculty Added Successfully" });
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    } else {
      res.status(402).json({ message: "Use Charusat Mail Id Only..." });
    }
  } catch (error) {
    console.log(error);
  }
});


router.post('/adminlogin', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please Fill all the Required Data" });
    } else {
      const facultyLogin = await facultyList.findOne({ email: email });
      if (!facultyLogin) {
        res.status(400).json({ message: "Email could not found!\nPlease Register and then try again." })
      } else {
        if (facultyLogin.verified === true) {
          const isMatch = await bcrypt.compare(password, facultyLogin.password);
          token = await facultyLogin.generateAuthToken();
          console.log(token);

          res.cookie('jwtokenfaculty', token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true
          });
          res.cookie('role', facultyLogin.role, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true
          });


          if (!isMatch) {
            res.status(400).json({ message: "Invalid Credentials" });
          } else {
            res.status(200).json({ message: "Signin Successfull...", token: token, role: facultyLogin.role });
          }
        } else {
          await sendOtpVerificationEmail(facultyLogin, res);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})






// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, fullName, department, college, semester, mobileNumber, password, cpassword } = req.body;

    if (!fullName || !email || !department || !college || !semester || !mobileNumber || !password || !cpassword) {
      res.status(422).json({ message: "Please fill all the details" });
    } else if (email.split('@')[1].toLowerCase() === 'charusat.edu.in') {
      const userExist = await User.findOne({ email: email });

      if (userExist) {
        res.status(422).json({ message: "User Already Exist with same email Id" });
      } else {

        if (password != cpassword) {
          res.status(422).json({ message: "Passwords not matching" });
        } else {
          const registerUser = new User({ email: email, fullName: fullName, department: department, college: college, semester: semester, mobileNumber: mobileNumber, password: password, cpassword: cpassword });
          console.log(`${registerUser} registered successfully`);
          // const userRegister = await registerUser.save();
          // console.log(userRegister);
          // res.status(200).json({ message: "User Added Successfully" });
          registerUser.save().then((result) => {
            console.log(result);
            sendOtpVerificationEmail(result, res);
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    } else {
      res.status(402).json({ message: "Use Charusat Mail Id Only..." });
    }
  } catch (error) {
    console.log(error);
  }
});

// OTP and mail generating function
const sendOtpVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "ScholarShelf 📧 " + "OTP for verification of Your Accout",
      html: `<p>Your OTP for Verification of your account at ScholarShelf is : <b>${otp}</b><br/>OTP will be expire in 10 minutes.</p>`
    }

    // hash otp

    const hashedOtp = await bcrypt.hash(otp, 12);
    const newOtpVerification = await new UserOtpVerification({
      userId: _id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000
    });

    const otpData = await newOtpVerification.save();
    console.log(otpData);
    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'scholarshelf.charusat@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: await AccessToken()
      }
    })
    const mailStatus = await transporter.sendMail(mailOptions);
    if (mailStatus) {
      console.log("mail sent successfully");
      res.status(202).json({
        status: "PENDING",
        message: "OTP Mail sent Successfully",
        userData: {
          userId: _id,
          email,
        },
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "OTP Mail could not sent Successfully",
      })
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "FAILED",
      message: "Unknown Error Occured while Verification",
    });
  }
}

// VerifyOtp route
router.post('/verifyOTP', async (req, res) => {
  try {
    const { userId, otp, role } = req.body;
    if (!userId || !otp) {
      res.status(400).json({ message: "Please Enter OTP First" });
    } else {
      const userOTPVerificationRecords = await UserOtpVerification.find({
        userId,
      });
      if (userOTPVerificationRecords.length <= 0) {
        // no records found
        res.status(400).json({ message: "Account Record not exist or has been verified already. Please login to continue" });

      } else {
        // user otp record exist
        const { expiresAt } = userOTPVerificationRecords[0];
        const hashedOtp = userOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          // user Otp record expired
          await UserOtpVerification.deleteMany({ userId });
          res.status(400).json({ message: "Your Otp has been Expired. Please SignUp again" });
        } else {
          const validOtp = await bcrypt.compare(otp, hashedOtp);

          if (validOtp) {
            // supplied otp wrong
            res.status(400).json({ message: "Entered OTP is incorrect" });
          } else {
            if (role === "Student") {
              await User.updateOne({ _id: userId }, { verified: true });
              await UserOtpVerification.deleteMany({ userId });
            } else {
              await facultyList.updateOne({ _id: userId }, { verified: true });
              await UserOtpVerification.deleteMany({ userId });
            }
            res.status(200).json({
              status: "VERIFIED",
              message: "User Email has been verified successfully"
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: "Unknown Error Occured while processing your request"
    });
  }
})



// Login Route
router.post('/login', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please Fill all the Required Data" });
    } else {
      const userLogin = await User.findOne({ email: email });
      if (!userLogin) {
        res.status(400).json({ message: "Email could not found!\nPlease Register and then try again." })
      } else {
        if (userLogin.verified === true) {
          const isMatch = await bcrypt.compare(password, userLogin.password);
          token = await userLogin.generateAuthToken();
          console.log(token);
          // window.localStorage.setItem('token', token);

          res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true,
            // sameSite: "none",
            // secure: true,
            // domain: "scholarshelf.vercel.app"
          });
          res.cookie('role', userLogin.role, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true,
            // sameSite: "none",
            // secure: true,
            // domain: "scholarshelf.vercel.app"
          });


          if (!isMatch) {
            res.status(400).json({ message: "Invalid Credentials" });
          } else {
            res.status(200).json({ message: "Signin Successfull...", token: token, role: userLogin.role });
          }
        }
        else {
          await sendOtpVerificationEmail(userLogin, res);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})


// User Routes i.e (myprofile, myforum)
router.get('/myProfile', Authenticate, async (req, res) => {
  try {
    const rootUser = req.rootUser;
    console.log(rootUser);
    res.status(200).json(rootUser);
  } catch (error) {
    res.status(400).json({ message: "Error Occured while fetching data" });
  }
})

router.get('/myForums', Authenticate, async (req, res) => {
  const rootUser = req.rootUser;

  ForumList.find({ uploadedById: rootUser._id }, (err, result) => {
    if (err) {
      res.status(422).json(err);
    }
    res.status(200).json(result);
  })

})


// Forum Routes
router.post('/forum', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: "Please Fill all the Required Data" });
    } else {

      const token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

      const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
      const newForum = new ForumList({ title: title, description: description, uploadedBy: rootUser.fullName, uploadedById: rootUser._id });
      console.log(`${newForum} registered successfully`);
      // const forumRegister = await newForum.save();
      await newForum.save();
      // console.log(forumRegister);
      res.status(200).json({ message: "Forum Added Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
})

router.post('/forumPost', async (req, res) => {
  try {
    const { comment, forumId } = req.body;
    if (!comment) {
      res.status(403).json({ message: "Please Type Comment First" });
    } else {
      const token = req.cookies.jwtoken;
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

      const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

      const commentedBy = rootUser.fullName;
      const commentedOn = new Date();

      const addComment = new CommentList({ comment, commentedBy, commentedOn, forumId });

      const addedComment = await addComment.save();
      console.log(addedComment);
      res.status(200).json({ message: "Comment Added SuccessFully" });
    }
  } catch (error) {
    console.log(error);
  }
})

// Join Community Route
router.post('/join', async (req, res) => {
  try {
    const { fname,
      lname,
      email,
      college,
      department,
      semester,
      github,
      linkedin, rollNumber } = req.body;
    if (!fname || !lname || !email || !college || !department || !semester || !github || !linkedin || !rollNumber) {
      res.status(400).json({ error: "Please Fill all the Required Data" });
    } else if (email.split('@')[1].toLowerCase() === 'charusat.edu.in') {
      const userExist = await CommunityList.findOne({ email: email });

      if (userExist) {
        res.status(400).json({ message: "User Already registered with same email Id" });
      } else {
        const newCommunityRequest = new CommunityList({ fname, lname, email, college, department, semester, github, linkedin, rollNumber });
        console.log(`${newCommunityRequest} registered successfully`);
        const communityRegister = await newCommunityRequest.save();
        console.log(communityRegister);
        res.status(200).json({ message: "Community request Added Successfully" });
      }
    } else {
      res.status(400).json({ message: "Use Charusat Mail Id Only..." });
    }
  } catch (error) {
    console.log(error);
  }
})

// Project Section 
router.post("/5bwghty", async (req, res) => {

  const projectName = req.body.projectName;
  const description = req.body.description;
  const author = req.body.author;
  const projecturl = req.body.projecturl;
  const authorid = req.body.authorid;
  const technology = req.body.technology;

  const proj = new projModel({ projectName: projectName, description: description, author: author, projecturl: projecturl, authorid: authorid, technology: technology });

  try {
    await proj.save();
    res.send("inserted data");
    console.log("Registered Successfully");
  } catch (err) {
    console.log(err);
  }
});

router.get("/read", async (req, res) => {
  projModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }

    res.send(result)
  })
});

// Material Section 
router.post("/imaterials", async (req, res) => {
  const mName = req.body.mName;
  const mUrl = req.body.mUrl;
  const mSubject = req.body.mSubject;
  const mType = req.body.mType;
  const mAuthor = req.body.mAuthor;
  const Department = req.body.Department;
  const Semester = req.body.Semester;
  const References = req.body.References;

  const proj = new MatModel({
    mName: mName,
    mUrl: mUrl,
    mSubject: mSubject,
    mType: mType,
    mAuthor: mAuthor,
    Department: Department,
    mAuthor: mAuthor,
    Semester: Semester,
    References: References,
  });
  // const proj = new MatModel({
  //   mName:"mName",
  //   mUrl:"mUrl",
  //   mSubject: "mSubject",
  //   mType: "mType",
  //   mAuthor:"mAuthor",
  //   Department:"Department",
  //   mAuthor:"mAuthor",
  //   Semester:4,
  //   References:"References",
  // });

  try {
    await proj.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

router.get("/materials", async (req, res) => {
  try {
    const result = await MatModel.find({
      // mSubject: "OS",
    });
    res.send(result);
  } finally {
  }
  // projModel.find({},(err,result) => {
  //   if(err){
  //     res.send(err)
  //   }

  //   res.send(result)
  // })
});

// Subject Cards Section

router.post("/subCards", async (req, res) => {

  const sub = new scards({
    subject: subject,
    fname: fname,
  });
  try {
    await sub.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

router.get("/rcards", async (req, res) => {
  try {
    const result = await scards.find({

    });
    res.send(result);
  }
  finally {

  }
})




router.get("/forumPost", async (req, res) => {
  // CommentList.find({"forumId": req.body.forumId}, (err, result) => {
  CommentList.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }

    res.send(result)
  })
});


router.get("/forums", async (req, res) => {
  ForumList.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result);
  })
});

router.get("/join", async (req, res) => {
  CommunityList.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result);
  })
});

// router.get("/forums/:id", async (req, res) => {
//   // ForumList.find({}, (err, result) => {
//   //   if (err) {
//   //     res.send(err)
//   //   }
//   //   res.send(result);
//   // })
//   ForumList.findById(req.params.id, (err, result) => {
//     if(err){
//       console.log(err);
//       res.status(500).send(err);
//     }
//     console.log(result);
//     res.status(200).send(result);
//   })
// });

router.get("/forum/:id", async (req, res) => {
  // ForumList.find({}, (err, result) => {
  //   if (err) {
  //     res.send(err)
  //   }
  //   res.send(result);
  // })
  ForumList.findById(req.params.id, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result);
    res.status(200).send(result);
  })
});


router.get('/about', (req, res) => {
  console.log("About Us");
  res.send(req.rootUser);
})
router.get('/forum', Authenticate, (req, res) => {
  console.log("Forum");
  res.status(200).send(req.rootUser);
})
// router.get('/5bwghty', AddDBEntry, (req, res) => {
//   console.log("Project Upload Section");
//   console.log(req.rootUser);
//   res.send(req.rootUser);
// })
// router.get('/imaterials', AddDBEntry, (req, res) => {
//   console.log("Project Upload Section");
//   console.log(req.rootUser);
//   res.send(req.rootUser);
// })
router.get('/addFaculty', AuthenticateHODPrincipal, (req, res) => {
  console.log("Add Faculty");
  console.log(req.rootUser);
})
router.get('/addproject', AddDBEntry, (req, res) => {
  console.log("New Project Request Section");
  res.send(req.rootUser);
})
router.get('/join', Authenticate, (req, res) => {
  console.log("Join Our Community");
  res.send(req.rootUser);
})

router.get('/dashboard', AuthenticateFaculties, (req, res) => {
  console.log("DashBoard");
})

router.get('/login', AuthenticateLoggedIn, () => {
  console.log("Login");
});

router.get('/register', AuthenticateLoggedIn, () => {
  console.log("Register");
});


router.get("/logout", (req, res) => {
  // localStorage.clear();
  res.clearCookie('jwtoken', { path: '/' });
  res.clearCookie('jwtokenfaculty', { path: '/' });
  res.clearCookie('role', { path: '/' });
  console.log("Logout Successfully");
  res.status(200).send("User Logout");
})


module.exports = router;