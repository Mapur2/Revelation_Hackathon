import React, { useEffect } from 'react'
import { Client, Databases, Query } from "appwrite";
import { apprwriteid, database, places, url } from '../../config';
import AddPlaces from '../components/AddPlaces';

function Places() {
  return (
    <div>
      <button className=' bg-teal-900'>Add</button>
      <AddPlaces/>
    </div>
  )
}

export default Places
