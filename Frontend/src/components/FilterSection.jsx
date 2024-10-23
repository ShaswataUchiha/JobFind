import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Kolkata", "Bangalore", "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Dev", "Backend Dev", "Software Engineer"],
  },
  {
    filterType: "Company Size",
    array: ["Small", "Medium", "Large"],
  },
  {
    filterType: "Salary",
    array: ["Below 50k", "50k-100k", "Above 100k"],
  },
];

const FilterSection = () => {
  return (
    <div className="w-full bg-gray-50 p-5 rounded-lg shadow-md">
      <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
      <hr className="mb-5" />

      {/* Render Filter Options */}
      <RadioGroup className="space-y-6">
        {filterData.map((data, filterIndex) => (
          <div key={filterIndex} className="mb-5">
            <h2 className="font-medium text-lg mb-3 text-gray-700">
              {data.filterType}
            </h2>
            <div className="space-y-2">
              {data.array.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-3">
                  <RadioGroupItem id={`${data.filterType}-${item}`} value={item} />
                  <Label htmlFor={`${data.filterType}-${item}`} className="text-gray-600">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterSection;
