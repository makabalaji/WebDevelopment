import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface FormData {
    name: string;
    age: number;
    contact: number;
}

export const HookForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const [data, setData] = useState<FormData[]>([]);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const onSubmit = (formData: FieldValues) => {
        if (editIdx !== null) {
            const updatedData = data.map((item, index) => (index === editIdx ? formData as FormData : item));
            setData(updatedData);
            setEditIdx(null);
        } else {
            setData([...data, formData as FormData]);
        }
    };

    const handleEdit = (index: number) => {
        setEditIdx(index);
        const rowData = data[index];
        setValue('name', rowData.name);
        setValue('age', rowData.age);
        setValue('contact', rowData.contact);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input {...register('name', { required: true, minLength: 3 })} id="name" type="text" className="form-control" />
                    {errors.name?.type === 'required' && <p className='text-danger'>Name field is required.</p>}
                    {errors.name?.type === 'minLength' && <p className='text-danger'>Name must be at least 3 chars.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input {...register('age', { required: true, min: 0 })} id="age" type="number" className="form-control" />
                    {errors.age?.type === 'required' && <p className='text-danger'>Age field is required.</p>}
                    {errors.age?.type === 'min' && <p className='text-danger'>Age must be a positive number.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input {...register('contact', { required: true, minLength: 10 ,maxLength:13})} id="contact" type="number" className="form-control" />
                    {errors.contact?.type === 'required' && <p className='text-danger'>Contact field is required.</p>}
                    {errors.contact?.type === 'minLength' && <p className='text-danger'>Contact must be at least 10 digits.</p>}
                    {errors.contact?.type === 'maxLength' && <p className='text-danger'>Contact should be more 13 digits.</p>}
                    {errors.contact?.type === 'maxLength' && <p className='text-danger'>Please cehck the Number.</p>}
                </div>
                <button className="btn btn-primary" type="submit">{editIdx !== null ? 'Update' : 'Submit'}</button>
            </form>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.contact}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
