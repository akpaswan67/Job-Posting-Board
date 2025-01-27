const Job = require("../models/Job");
const sendEmail = require("../services/emailService");

exports.postJob = async (req, res, next) => {
//   console.log("***************************************************")
    try {
        const { title, description, experienceLevel, candidates, endDate } = req.body;
        const job = await Job.create({
            title,
            description,
            experienceLevel,
            candidates,
            endDate,
            // companyId: req.company.id,
        });

        // console.log(job)
        // Send emails to candidates
        for (const email of candidates) {
            await sendEmail(email, "New Job Opportunity", `Check out this job: ${title}`);
        }

        res.status(201).json({ message: "Job posted successfully", job });
    } catch (err) {
        next(err);
    }
};