import Guide from "../models/guideModel.js";

export const createGuideProfile = async (req, res) => {
    try { 
        //logged in user info
        const userId = req.user.id;

        //only guide are allowed
        if(req.user.role !== "guide"){
            return res.status(403).json({message: "only guides can create profile"})
        }

        const {
            city,
            languages,
            pricePerHour,
            experience,
            bio,
            profilePhoto,
            photos,
        } = req.body

        //check if guide profile already exist
        let guide = await Guide.findOne({user: userId})

        if(guide) {
            // If exists → update profile
                guide.city = city || guide.city;
                guide.languages = languages || guide.languages;
                guide.pricePerHour = pricePerHour || guide.pricePerHour;
                guide.experience = experience || guide.experience;
                guide.bio = bio || guide.bio;
                guide.profilePhoto = profilePhoto || guide.profilePhoto;
                guide.photos = photos || guide.photos;

                await guide.save();

                return res.json({
                    message: "Guide profile updated successfully",
                    guide,
                });
        }

        const newGuide = await Guide.create({
            user: userId,
            city,
            languages,
            pricePerHour,
            experience,
            bio,
            profilePhoto,
            photos,
        });

        res.status(201).json({
            message: "Guide profile created successfully",
            guide: newGuide,
        });
    } catch (error){
        console.error("Guide profile error:", error.message);
        res.status(500).json({message: "Server error"});
    }
};


export const getAllGuides = async (req, res) => {
    try {
        const guides = await Guide.find()
        .populate("user", "name verificationTier")
        .sort({ created: -1 });

        res.json({
            count: guides.length,
            guides,
        });
    } catch (error) {
        console.error("Get guides error:", error.message);
        res.status(500).json({ message: "Server error"});
    }
};