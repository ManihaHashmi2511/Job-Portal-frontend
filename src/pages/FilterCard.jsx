import { Label, Radio } from 'flowbite-react'
import React, { useState } from 'react'

export default function FilterCard({ onFilterChange }) {

    let filterData = [
        {
            filterType: "All",
            array: ["Reset Filters"]
        },
        {
            filterType: "Industry",
            array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "MERN Stack Developer"]
        },
        {
            filterType: "Location",
            array: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Rawal Pindi"]
        },
        {
            filterType: "Job Type",
            array: ["Full-time", "Part-time", "Internship", "Contract"]
        },
        
    ]

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedFilterType, setSelectedFilterType] = useState('');

    const handleClick = (filterType, value) => {
        if (selectedValue === value && selectedFilterType === filterType) {
            // Unselect
            setSelectedValue('');
            setSelectedFilterType('');
            if(onFilterChange){
                onFilterChange('', '');
            }
        } else {
            // Select
            setSelectedValue(value);
            setSelectedFilterType(filterType);
            if(onFilterChange){
                onFilterChange(filterType, value);
            }
        }
    }

  return (
    <div>
      <div className='font-bold text-[20px] mt-[-30px] flex gap-2 items-center' ><span><i className="fa-solid fa-sliders text-[22px] text-black"></i></span> Filter Jobs</div>
      <div className="flex max-w-md flex-col gap-4 overflow-y-auto">
        <div>

               {

                  filterData.map((data, index) => (
                    <div key={index} className='my-1 p-2.5'>
                        <h2 className='font-bold text-[18px] mb-1'>{data.filterType}</h2>
                        {
                            data.array.map((item, idx) => (
                                <div key={idx} className='flex items-center gap-2 py-1.5'>
                                    <Radio
                                        id={item}
                                        className="cursor-pointer text-rose-500 focus:ring-rose-500 dark:ring-offset-rose-500 dark:focus:ring-rose-500"
                                        value={item}
                                        checked={selectedValue === item && selectedFilterType === data.filterType}
                                        onClick={() => handleClick(data.filterType, item)}
                                        readOnly
                                    />
                                    <Label>{item}</Label>
                                </div>
                            ))
                        }
                    </div>
                  ))

               }

        </div>
      </div>
    </div>
  )
}
