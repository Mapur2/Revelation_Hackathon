import React, { useState } from 'react'
import { Client, Databases, ID } from "appwrite";
import { apprwriteid, database, url } from '../../config';
import service from '../appwrite/Services';
import { useNavigate } from 'react-router-dom';


function AddRestaurant() {

    const navigate = useNavigate()
    const [place, setPlace] = useState({
        name: "", content: "", city: "Kolkata", stars: 0, map: "", zomato: "", swiggy: ""
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

        if (place.map == '' || place.name == "" || place.content == "" ||place.city == ""
            || place.stars == "" || banner == null)
            return alert("Enter all the details")

        var banpic = await service.uploadFile(banner);
        var pic = []
        for (let i = 0; i < pics.length; i++) {
            const p = await service.uploadFile(pics[i])
            pic.push(p.$id)
        }
        console.log(pic)
        console.log(banpic)

        const dbPlace = await service.createRestaurant({
            name: place.name,
            content: place.content,
            bannerPic: banpic.$id, city: place.city, pics: pic, stars: place.stars,
            map: place.map,zomato:place.zomato,swiggy:place.swiggy
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
            <h1>Add Restaurants</h1>
            <label className='form-label'>Name</label>
            <input name='name' type="text" onChange={handleChange} />
            <br />

            <label className='form-label'>Content</label>
            <textarea name="content" onChange={handleChange} id="" cols="60" rows="5"></textarea>
            
            <br />
            <label className='form-label' htmlFor="city">City</label>
            <select name="city" id="" onChange={handleChange}>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
            </select> <br />
            <label className='form-label' htmlFor="city">Stars</label>
            <input type="text" name='stars' onChange={handleChange} />
            <br />
            <label className='form-label' htmlFor="">Map Link</label>
            <input type="text" name="map" onChange={handleChange} />
            <br />
            <label className='form-label' htmlFor="">ZomatoLink</label>
            <input type="text" name="zomato" onChange={handleChange} />
            <br />
            <label className='form-label' htmlFor="">Swiggy Link</label>
            <input type="text" name="swiggy" onChange={handleChange} />
            <br />
            <label className='form-label' htmlFor="">Choose Banner</label>
            <input type="file" name="banner" id="" placeholder='Choose Banner' onChange={e => SetBanner(e.target.files[0])} />

            <br />
            <label className='form-label' htmlFor="">Choose More Pics(Optional)</label>
            <input type="file" name="pics" multiple id="" placeholder='Choose More Pics(Optional)' onChange={e => Setpics(prev => [...prev, e.target.files[0]])} />
            <br />
            <button onClick={submit}>Submit</button>
{/*             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, facere autem. Soluta laboriosam dolorum rerum ut eligendi repellendus quis ad pariatur, expedita, saepe, dolore aliquid eius assumenda delectus molestias cumque!
 */}        </div>
    )
}

export default AddRestaurant
