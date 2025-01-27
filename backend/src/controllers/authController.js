const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Company = require("../models/Company");
const sendEmail = require("../services/emailService");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const company = await Company.create({ name, email, password: hashedPassword });

        // Send verification email
        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const verificationLink = `${req.protocol}://${req.get("host")}/api/auth/verify/${token}`;
        await sendEmail(email, "Verify your account", `Click here: ${verificationLink}`);

        res.status(201).json({ message: "Registration successful. Please verify your email." });
    } catch (err) {
        next(err);
    }
};

exports.verify = async (req, res, next) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await Company.findByIdAndUpdate(decoded.id, { isVerified: true });
        res.status(200).json({ message: "Account verified successfully." });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const company = await Company.findOne({ email });
        if (!company) return res.status(404).json({ message: "Company not found" });
        if (!company.isVerified) return res.status(403).json({ message: "Account not verified" });

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true }).json({ message: "Login successful" });
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token").json({ message: "Logged out successfully" });
};
