import express,{Request, Response} from "express";
import multer from 'multer';
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
     limits:{
        fileSize: 5* 1024 * 1024
    }
})
 
router.post("/",
     verifyToken,[
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"), 
        body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
     ],
     upload.array("imageFiles",6), 
     async (req: Request, res: Response)=> {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
       

        const uploadPromises = imageFiles.map(async(image)=>{
              const b64 = Buffer.from(image.buffer).toString("base64")
              let dataURI="data:" + image.mimetype + ";base64,"+b64;
              const res = await cloudinary.v2.uploader.upload(dataURI);
              return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls=imageUrls;
        newHotel.lastUpdated= new Date();
        newHotel.userId= req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);

    }catch (e) {
        console.log("Error creating hotel: ",e);
        res.status(500).json({message: "Something went wrong"});
    }
});

export default router;

// import express, { Request, Response } from "express";
// import multer from 'multer';
// import cloudinary from "cloudinary";
// import Hotel, { HotelType } from "../models/hotel"; // Importing Hotel model
// import verifyToken from "../middleware/auth"; // Importing authentication middleware
// import { body } from "express-validator"; // Importing express-validator for request validation

// const router = express.Router();

// // Configure multer for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024 // Limiting file size to 5 MB
//     }
// });

// // Define route handler for creating a new hotel
// router.post("/", verifyToken, [
//     // Request validation using express-validator middleware
//     body("name").notEmpty().withMessage("Name is required"),
//     body("city").notEmpty().withMessage("City is required"),
//     body("country").notEmpty().withMessage("Country is required"),
//     body("description").notEmpty().withMessage("Description is required"),
//     body("type").notEmpty().withMessage("Hotel type is required"),
//     body("pricePerNight")
//         .notEmpty()
//         .isNumeric()
//         .withMessage("Price per night is required and must be a number"),
//     body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
// ],
// // File upload middleware for handling images
// upload.array("imageFiles", 6), // Allowing up to 6 image files

// // Async route handler function
// async (req: Request, res: Response) => {
//     try {
//         // Extracting uploaded image files and hotel data from request
//         const imageFiles = req.files as Express.Multer.File[];
//         const newHotel: HotelType = req.body;

//         // Uploading images to Cloudinary and getting URLs
//         const uploadPromises = imageFiles.map(async (image) => {
//             const b64 = Buffer.from(image.buffer).toString("base64");
//             let dataURI = "data:" + image.mimetype + ";base64," + b64;
//             const res = await cloudinary.v2.uploader.upload(dataURI);
//             return res.url;
//         });

//         // Wait for all uploads to finish and get image URLs
//         const imageUrls = await Promise.all(uploadPromises);
//         newHotel.imageUrls = imageUrls;

//         // Add additional data to the hotel object
//         newHotel.lastUpdated = new Date();
//         newHotel.userId = req.userId;

//         // Create a new hotel instance using the Hotel model and save to database
//         const hotel = new Hotel(newHotel);
//         await hotel.save();

//         // Send successful response with created hotel data
//         res.status(201).send(hotel);
//     } catch (e) {
//         // Handle errors by logging and sending an error response
//         console.log("Error creating hotel: ", e);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// export default router;



