import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import service from '../appwrite/Services';


function AddMarket() {

    const navigate=useNavigate()
    const [place, setPlace] = useState({
        name: "", content: "", location: "", map: ""
    })
    const [banner, SetBanner] = useState(null)
    console.log(place)
    const handleChange = (e) => {
        let { name, value } = e.target
        setPlace(prev => {
            return { ...prev, [name]: value }
        })
    }
    console.log(banner)

    const submit = async () => {

        if (place.map == '' || place.name == "" || place.content == "" || place.location == "" ||banner == null)
            return alert("Enter all the details")

        var banpic = await service.uploadFile(banner);
        console.log(banpic)

        const dbPlace = await service.createMarket({
            name: place.name,
            content: place.content, 
            location: place.location, 
            bannerPic: banpic.$id,
            maps:place.map
        })

        if (dbPlace) {
            
            alert("Successfully added")
            navigate("/")
            
        }
        else {
            await service.deleteFile(banpic.$id)
            alert("Unsuccessfull")
        }
    }

    return (
        <div className='inputbox'>
            <h1>Add Market</h1>
            <label className='form-label'>Name</label>
            <input name='name' type="text" onChange={handleChange} />
            <br />

            <label className='form-label'>Content</label>
            <textarea name="content"  onChange={handleChange} id="" cols="30" rows="10"></textarea>

            <label className='form-label' htmlFor="location">Location</label>
            <input type="text" name='location' onChange={handleChange} />


            <label className='form-label' htmlFor="">Map Link</label>
            <input type="text" name="map" onChange={handleChange} />

            <label className='form-label' htmlFor="">Choose Banner</label>
            <input type="file" name="banner" id="" placeholder='Choose Banner' onChange={e => SetBanner(e.target.files[0])} />

            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default AddMarket
