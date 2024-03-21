'use client';

import { useEffect, useRef, useState } from "react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { v4 } from "uuid";

import useNotesStore from "@/stores/useNotesStore";


export default function Home() {

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');

  const [showAddNoteField, setShowAddNoteField] = useState<boolean>(false);
  const [currentlyEditingNoteId, setCurrentlyEditingNoteId] = useState<null | string>(null);
  const [noteText, setNoteText] = useState<string>('');
  const [hasNoteTextLengthError, setHasNoteTextLengthError] = useState<boolean>(false);

  const { notes, addNote, deleteNote, updateNote, fetchNotes } = useNotesStore();
  
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if(noteText.length < 20 || noteText.length > 300) {
      setHasNoteTextLengthError(true);
    } else {
      setHasNoteTextLengthError(false);
    }
  }, [noteText]);

  const editNote = (id: string, content: string): void => {
    setShowAddNoteField(false);
    setCurrentlyEditingNoteId(id);
    setNoteText(content);
  }

  const cancelEditNote = (): void => {
    setShowAddNoteField(false);
    setCurrentlyEditingNoteId(null);
    setNoteText('');
  }

  const saveEditedNote = (id: string): void => {
    setShowAddNoteField(false);
    updateNote(id, { updatedAt: (new Date()).toUTCString(), content: noteText });
    setCurrentlyEditingNoteId(null);
    setNoteText('');
  }

  const saveNote = (): void => {
    setShowAddNoteField(val => !val);
    addNote({
      id: v4(),
      createdAt: (new Date()).toUTCString(),
      updatedAt: (new Date()).toUTCString(),
      content: noteText,
    });
  }

  const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-row justify-between mb-8 w-full">
        <h2 className="text-4xl">Notes</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchNotes()}>Refresh</button>
      </div>
      <div className="flex flex-row items-center justify-between mb-8 border border-gray-300 rounded-lg w-full">
        <input ref={searchInputRef} type="text" onChange={e => setSearch(e.target.value)} placeholder="Search notes..." className="p-4 w-full bg-transparent" />
        {search !== '' && <button className="text-gray-500 py-2 px-4" onClick={() => { setSearch(''); if(searchInputRef.current) searchInputRef.current.value = ''; }}>Clear</button>}
      </div>
      { filteredNotes.map(note => (
        <div key={note.id} className="flex flex-row p-4 border items-center border-gray-300 rounded-lg mb-4 w-full">
          {currentlyEditingNoteId !== note.id && (
            <>
              <div className="flex flex-col">
                {note.content}
                <div className="flex flex-row text-xs text-gray-500 mt-2">
                  Created {Intl.DateTimeFormat(undefined, {dateStyle: 'full', timeStyle: 'long'}).format(new Date(note.createdAt))}, last updated {Intl.DateTimeFormat(undefined, {dateStyle: 'full', timeStyle: 'long'}).format(new Date(note.updatedAt))}
                </div>
              </div>
              <div className="flex flex-row ml-auto gap-2">
                <button className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded" onClick={() => editNote(note.id, note.content)}><PencilSquareIcon className="h-6 w-6" /></button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteNote(note.id)}><TrashIcon className="h-6 w-6" /></button>
              </div>
            </>
          )}
          {currentlyEditingNoteId == note.id && (
            <form className="flex flex-col w-full">
              <textarea onChange={(e) => setNoteText(e.target.value)} className="p-4 border border-gray-300 rounded-lg mb-4 w-full" defaultValue={note.content} />
              <div className="flex flex-row">
                <span className={`text-sm ${hasNoteTextLengthError ? 'text-red-500' : 'text-gray-500'}`}>{noteText.length} / 300 characters, minimum 20 characters</span>
                <div className="flex flex-row mb-8 ml-auto gap-4">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => cancelEditNote()}>Cancel</button>
                  <button disabled={hasNoteTextLengthError} className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${hasNoteTextLengthError ? 'opacity-50' : 'hover:bg-blue-700'}`} type="button" onClick={() => saveEditedNote(note.id)}>Save</button>
                </div>
              </div>
            </form>
          )}
        </div>
      ))}
      { showAddNoteField && (
        <form className="flex flex-col w-full">
          <textarea onChange={(e) => setNoteText(e.target.value)} className="p-4 border border-gray-300 rounded-lg mb-4 w-full" placeholder="Enter note text..." />
          <div className="flex flex-row">
            <span className={`text-sm ${hasNoteTextLengthError ? 'text-red-500' : 'text-gray-500'}`}>{noteText.length} / 300 characters, minimum 20 characters</span>
            <div className="flex flex-row mb-8 ml-auto gap-4">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setShowAddNoteField(val => !val)}>Cancel</button>
              <button disabled={hasNoteTextLengthError} className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${hasNoteTextLengthError ? 'opacity-50' : 'hover:bg-blue-700'}`} type="button" onClick={() => saveNote()}>Save</button>
            </div>
          </div>
        </form>
      )}
      {!showAddNoteField && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowAddNoteField(val => !val)}>Add Note</button>}
    </main>
  );
}
