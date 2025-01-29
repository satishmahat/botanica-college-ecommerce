import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddPlantMutation } from '../../../redux/features/plants/plantsApi';
import Swal from 'sweetalert2';

const AddPlant = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [addPlant, { isLoading, isError }] = useAddPlantMutation();
    const [imageFileName, setImageFileName] = useState('');

    const onSubmit = async (data) => {
        const newPlantData = {
            ...data,
            coverImage: imageFileName
        };
        try {
            await addPlant(newPlantData).unwrap();
            Swal.fire({
                title: "Plant added",
                text: "Your plant has been added successfully!",
                icon: "success",
            });
            reset();
            setImageFileName('');
            setImageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to add plant. Please try again.",
                icon: "error",
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
        }
    };

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Plant</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Plant Name"
                    name="title"
                    placeholder="Enter plant name"
                    register={register}
                />

                <InputField
                label="Description"
                name="description"
                placeholder="Enter plant description"
                type="textarea"
                register={register}

                />                      


                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'indoor-plants', label: 'Indoor-plants' },
                        { value: 'outdoor-plants', label: 'Outdoor-plants' },
                        { value: 'gardening-tools', label: 'Gardening-tools' },
                        { value: 'accessories', label: 'Accessories' },
                    ]}
                    register={register}
                />


                <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                    type="checkbox"
                    {...register('trending')}
                    className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                </label>
                </div>

                {/* Old Price */}
                <InputField
                label="Old Price"
                name="oldPrice"
                type="number"
                placeholder="Old Price"
                register={register}
                
                />

                {/* New Price */}
                <InputField
                label="New Price"
                name="newPrice"
                type="number"
                placeholder="New Price"
                register={register}
                
                />               

                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                <button type="submit" className="w-full py-2 bg-green-800 text-white font-bold rounded-md">
                    {isLoading ? <span>Adding..</span> : <span>Add Plant</span>}
                </button>
            </form>
        </div>
    );
};

export default AddPlant;
