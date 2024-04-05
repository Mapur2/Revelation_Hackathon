import React, { useState } from 'react'
import { Client, Databases, ID } from "appwrite";
import { apprwriteid, database, url } from '../../config';
import service from '../appwrite/Services';


function AddPlaces() {

    const [place, setPlace] = useState({
        name: "", content: "", location: "", city: "Kolkata", stars: 0, map: ""
    })
    const [banner, SetBanner] = useState(null)
    const [pics, Setpics] = useState([])
    console.log(place)
    const handleChange = (e) => {
        let { name, value } = e.target
        setPlace(prev => {
            return { ...prev, [name]: value }
        })
    }
    console.log(banner)
    console.log(pics)

    const submit = async () => {

        if (place.map == '' || place.name == "" || place.content == "" || place.location == "" || place.city == "" || place.stars == "" || banner == null)
            return alert("Enter all the details")

        var banpic = await service.uploadFile(banner);
        var pic = []
        for (let i = 0; i < pics.length; i++) {
            const p = await service.uploadFile(pics[i])
            pic.push(p.$id)
        }
        console.log(pic)
        console.log(banpic)

        const dbPlace = await service.createPlace({
            name: place.name,
            content: place.content, location: place.location, 
            bannerPic: banpic.$id, city: place.city, pics: pic, stars: place.stars,
            map:place.map
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
            <h1>Add Places</h1>
            <label className='form-label'>Name</label>
            <input name='name' type="text" onChange={handleChange} />
            <br />

            <label className='form-label'>Content</label>
            <textarea name="content"  onChange={handleChange} id="" cols="30" rows="10"></textarea>

            <label className='form-label' htmlFor="location">Location</label>
            <input type="text" name='location' onChange={handleChange} />

            <label className='form-label' htmlFor="city">City</label>
            <select name="city" id="" onChange={handleChange}>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
            </select>
            <label className='form-label' htmlFor="city">Stars</label>
            <input type="text" name='stars' onChange={handleChange} />

            <label className='form-label' htmlFor="">Map Link</label>
            <input type="text" name="map" onChange={handleChange} />

            <label className='form-label' htmlFor="">Choose Banner</label>
            <input type="file" name="banner" id="" placeholder='Choose Banner' onChange={e => SetBanner(e.target.files[0])} />


            <label className='form-label' htmlFor="">Choose More Pics(Optional)</label>
            <input type="file" name="pics" multiple id="" placeholder='Choose More Pics(Optional)' onChange={e => Setpics(prev => [...prev, e.target.files[0]])} />

            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default AddPlaces
