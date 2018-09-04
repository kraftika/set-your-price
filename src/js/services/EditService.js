import React from 'react';

const EditService = ({ service, save }) => {
    const { name, price, ccy, description } = service;
    return (
        <div>
            <form name="saveService" onSubmit={save}>
                <fieldset>
                    <legend>Edit Service</legend>

                    <label htmlFor="serviceName">Name</label>
                    <input type="text" name="serviceName" defaultValue={name}/>
                    
                    <label htmlFor="servicePrice">Price</label>
                    <input type="text" name="servicePrice" defaultValue={price}/>

                    <label htmlFor="serviceCcy">Currency</label>
                    <input type="text" name="serviceCcy" defaultValue={ccy}/>
                    
                    <label htmlFor="serviceDescription">Description</label>
                    <textarea name="serviceDescription" defaultValue={description}/>
                </fieldset>
                <button type="submit">Save</button>   
            </form>
        </div>
    );
}

export default EditService;