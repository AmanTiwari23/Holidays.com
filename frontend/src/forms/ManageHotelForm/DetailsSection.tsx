// import { useFormContext } from "react-hook-form"
// import { HotelFormData } from "./ManageHotelForm";

// const DetailsSection = () => {
//     const { register, formState:{errors}, } =useFormContext<HotelFormData>();

//     return(
//         <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
//             <label className="text-gray-700 text-sm font-bold flex-1">
//                     Name
//                    <input 
//                    type="text"
//                    className="border rounded w-full py-1 px-2 font-normal"
//                       {...register("name",{required:"This field is required"})}></input>
//                         {errors.name && (
//                         <span className="text-red-500">{errors.name.message}</span>
//                     )}
//                 </label>
//                 <div className="flex gap-4">
//                 <label className="text-gray-700 text-sm font-bold flex-1">
//                    City
//                    <input 
//                    type="text"
//                    className="border rounded w-full py-1 px-2 font-normal"
//                       {...register("city",{required:"This field is required"})}></input>
//                       {errors.city && (
//                         <span className="text-red-500">{errors.city.message}</span>
//                     )}
//                 </label>
//                 <label className="text-gray-700 text-sm font-bold flex-1">
//                     Country
//                    <input 
//                    type="text"
//                    className="border rounded w-full py-1 px-2 font-normal"
//                       {...register("country",{required:"This field is required"})}></input>
//                       {errors.country && (
//                         <span className="text-red-500">{errors.country.message}</span>
//                     )}
//                 </label>
//                 </div>

//                 <label className="text-gray-700 text-sm font-bold flex-1">
//                    Discription
//                    <textarea 
//                     rows={10}
//                    className="border rounded w-full py-1 px-2 font-normal"
//                       {...register("description",{required:"This field is required"})}></textarea>
//                       {errors.description && (
//                         <span className="text-red-500">{errors.description.message}</span>
//                     )}
//                 </label>

//                 <label className="text-gray-700 text-sm font-bold max-w-[50%]">
//                    Price Per Night
//                    <input
//                    type="number"
//                    min={1}
//                    className="border rounded w-full py-1 px-2 font-normal"
//                       {...register("pricePerNight",{required:"This field is required"})}></input>
//                       {errors.pricePerNight && (
//                         <span className="text-red-500">{errors.pricePerNight.message}</span>
//                     )}
//                 </label>
//                 <label className="text-gray-700 text-sm font-bold max-w-[50%]">
//                    Star Rating
//                     <select {...register("startRating",{
//                         required: "This field is required",
//                     })}
//                     className="border rounded w-full p-2 text-gray-700 fort-normal"
//                     >
//                        <option value="" className="text-sm font-bold" >
//                         Select as Rating
//                        </option>
//                        {[1,2,3,4,5].map((num)=>
//                         <option value={num}>{num}</option>
//                        )}
//                     </select>
//                       {errors.startRating && (
//                         <span className="text-red-500">{errors.startRating.message}</span>
//                     )}
//                 </label>
//         </div>
//     );
// };

// export default DetailsSection;

import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            
            <label htmlFor="name" className="text-gray-700 text-sm font-bold">
                Name
                <input 
                    type="text"
                    id="name"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>
            
            <div className="flex gap-4">
                <label htmlFor="city" className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input 
                        type="text"
                        id="city"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", { required: "This field is required" })}
                    />
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>
                
                <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input 
                        type="text"
                        id="country"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", { required: "This field is required" })}
                    />
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>

            <label htmlFor="description" className="text-gray-700 text-sm font-bold">
                Description
                <textarea 
                    id="description"
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "This field is required" })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>

            <label htmlFor="pricePerNight" className="text-gray-700 text-sm font-bold">
                Price Per Night
                <input
                    type="number"
                    id="pricePerNight"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", { required: "This field is required" })}
                />
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                   Star Rating
                    <select 
                    id="starRating"
                    {...register("starRating",{
                        required: "This field is required",
                    })}
                    className="border rounded w-full p-2 text-gray-700 fort-normal"
                    >
                       <option value="" className="text-sm font-bold" >
                        Select as Rating
                       </option>
                       {[1,2,3,4,5].map((num,index)=>
                        <option key={index} value={num}>{num}</option>
                       )}
                    </select>
                      {errors.starRating && (
                        <span className="text-red-500">{errors.starRating.message}</span>
                    )}
                </label>
        </div>
    );
};

export default DetailsSection;
