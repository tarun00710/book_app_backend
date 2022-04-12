const express = require("express")
const router = express.Router()
const passport = require("passport")

require('../passport')

router.get("/login/success", async(req, res)=>{
    try {
        console.log("i tried",req.user)
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
        })
    }
    } catch (error) {
        console.log(error.message)
    }
})

router.get("/login/failed", (req, res)=>{
        res.status(401).json({
            success: false,
            message: "failure",
        })
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("https://bookfinder.netlify.app/")
});

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "https://bookfinder.netlify.app/search",
    failureRedirect: "/login/failure"
}))

module.exports = router