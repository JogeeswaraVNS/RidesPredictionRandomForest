import React, { useState } from 'react'
import Maps from '../maps/Maps'
import Search from '../search/Search'


function Rootlayout() {

  const [seefare,setseefare]= useState(false)

  const [pickuplocationselection, setpickuplocationselection] = useState('')

  const [dropofflocationselection, setdropofflocationselection] = useState('')

  const [pickupmark, setpickupmark] = useState(false)

  const [dropoffmark, setdropoffmark] = useState(false)

  // console.log("selected drop off location"+dropofflocationselection.display_name)
  
  // console.log("selected pick up location"+pickuplocationselection.lat+pickuplocationselection.lon)

  return (
    <div>
        <div style={{display:'flex'}}>
            <div style={{width:'60vw',height:'90vh'}}>
                <Maps pickuplat={pickuplocationselection.lat} pickuplon={pickuplocationselection.lon} pickupname={pickuplocationselection.display_name}
                dropofflat={dropofflocationselection.lat} dropofflon={dropofflocationselection.lon} dropoffname={dropofflocationselection.display_name}
                pickupmark={pickupmark} dropoffmark={dropoffmark}
                seefare={seefare} setseefare={setseefare}
                />
            </div>
            <div style={{width:'40vw',height:'90vh',overflow: 'auto'}}>
                <Search pickuplocationselection={pickuplocationselection} setpickuplocationselection={setpickuplocationselection}
                dropofflocationselection={dropofflocationselection} setdropofflocationselection={setdropofflocationselection}
                pickupmark={pickupmark} dropoffmark={dropoffmark} setpickupmark={setpickupmark} setdropoffmark={setdropoffmark}
                seefare={seefare} setseefare={setseefare}
                />
            </div>
        </div>
    </div>
  )
}

export default Rootlayout