// Author: Christin Saji

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import FormField from '../../molecules/FormField';
import RadioField from '../../molecules/RadioField';
import Button from '../../atoms/button';
import defaultProfilePic from '../../../shared/assets/default-profile-pic.jpg';

const ProfileForm = ({ isEditing, setIsEditing }) => {
  const [formData, setFormData] = useState({
    name: 'Christin Saji',
    email: 'christin.saji@dal.ca',
    phone: '1234567890',
    address: '1234 South St, Halifax, Nova Scotia, Canada',
    role: 'bidder',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case 'name':
        if (!value.match(/^[A-Za-z\s]+$/)) {
          errors.name = 'Name should contain only letters';
        } else {
          delete errors.name;
        }
        break;
      case 'email':
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errors.email = 'Invalid email format';
        } else {
          delete errors.email;
        }
        break;
      case 'phone':
        if (!value.match(/^\d{10}$/)) {
          errors.phone = 'Phone number should contain exactly 10 digits';
        } else {
          delete errors.phone;
        }
        break;
      case 'address':
        if (!value) {
          errors.address = 'Address is required';
        } else {
          delete errors.address;
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFileChange = () => {
  };

  return (
    <form className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          {/* Image Source: https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm */}
          <img src={defaultProfilePic} alt="Profile" />
        </div>
        {isEditing && (
          <Button type="button" onClick={() => document.getElementById('fileInput').click()} className="mb-4">
            Change Profile Pic
          </Button>
        )}
        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
        <h2 className="text-2xl font-bold text-center text-bsnavyblue">{formData.name}</h2>
      </div>
      <FormField
        type="text"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        name="name"
        label="Name"
        error={formErrors.name}
        readOnly={!isEditing}
      />
      <FormField
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
        name="email"
        label="Email Address"
        error={formErrors.email}
        readOnly={!isEditing}
      />
      <FormField
        type="text"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        name="phone"
        label="Phone Number"
        error={formErrors.phone}
        readOnly={!isEditing}
      />
      <FormField
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        name="address"
        label="Address"
        error={formErrors.address}
        readOnly={!isEditing}
      />
      <div className="flex items-center space-x-3">
        <span className="text-bsnavyblue font-semibold">Role:</span>
        {isEditing ? (
          <>
            <RadioField
              label="Bidder"
              value="bidder"
              onChange={handleChange}
              name="role"
              checked={formData.role === 'bidder'}
            />
            <RadioField
              label="Tender Issuer"
              value="issuer"
              onChange={handleChange}
              name="role"
              checked={formData.role === 'issuer'}
            />
          </>
        ) : (
          <span>{formData.role === 'bidder' ? 'Bidder' : 'Tender Issuer'}</span>
        )}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        {isEditing ? (
          <>
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
