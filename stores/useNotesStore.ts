import { create } from 'zustand';
import { v4 } from "uuid";

export interface Note {
  id: number;
  createdAt: string,
  updatedAt: string,
  content: string;
}

export interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: number, updatedFields: Partial<Note>) => void;
  deleteNote: (id: number) => void;
  setNotes: (notes: Note[]) => void;
  fetchNotes: () => Promise<void>;
}

const useNotesStore = create<NotesState>((set) => ({
  notes: [],

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  updateNote: (id, updatedFields) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedFields } : note
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),

  setNotes: (notes) =>
    set(() => ({
      notes,
    })),

  fetchNotes: async () => {
    const fetchedNotes: Note[] = [
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient expressed increased comfort with the new medication regimen. No adverse reactions reported.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Follow-up appointment scheduled for next month to assess progress with current treatment plan.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient showed significant improvement in mobility after the physiotherapy session.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Dietary adjustments recommended to address nutritional deficiencies have been well received.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient reported better sleep quality following the implementation of suggested sleep hygiene practices.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Noticed a decrease in anxiety levels after starting guided meditation sessions as part of the treatment.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Blood pressure readings have stabilized with the adjusted medication dosage.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient has been adhering to the prescribed exercise regimen, showing positive outcomes in overall health.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'No significant changes in symptoms were reported in the last review. Monitoring to continue as planned.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient demonstrated improved understanding and management of their condition during the education session.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Upcoming surgery discussed, with all pre-operative and post-operative care plans clearly explained and understood.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient expressed concerns about medication side effects; alternatives and adjustments are being considered.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Recent lab results indicate progress towards targeted health markers. Positive trend noted.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Patient’s family provided additional history that could be relevant to the treatment plan. Details to be reviewed.' },
      { id: v4(), createdAt: new Date().toUTCString(), updatedAt: new Date().toUTCString(), content: 'Continued observation recommended for newly observed symptoms. No immediate action required but to be revisited next visit.' },
    ];
    set(() => ({
      notes: fetchedNotes,
    }));
  },
}));

export default useNotesStore;