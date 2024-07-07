import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function NursesNotes({ json }) {

  const [noteBodies, setNoteBodies] = useState([]);


  const handleNoteInput = (noteId, val) => {
    let newNoteBodies = noteBodies.map((note, _noteId) => {
      if (_noteId === noteId) {
        note = val;
      }
    });
    setNoteBodies(newNoteBodies);
  }

  const createNewNote = () => {
    setNoteBodies([...noteBodies, '']);
  }

  return (
    <div class='viewTab'>
      <form>
        <div className='NurseAssessment'>
          <textarea></textarea>
        </div>
        <div className='noteGroup'>
          <div className='NurseNote'>
            <textarea 
              key={0}
              onChange={handleNoteInput}
            ></textarea>
          </div>
          <button
            onClick={createNewNote}
          >
            +
          </button>
        </div>
      </form>
      <Outlet />
    </div>
  );
}