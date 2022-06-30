import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const s1={
        name: 'Mithun',
        age: 18
    }

    return(
        <NoteContext.Provider value={s1}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;