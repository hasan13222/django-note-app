import { useEffect, useState } from "react";
import api from "../api";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        setNotes(res.data)
        console.log(res.data)
      })
      .catch((err) => alert(err));
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted successfully");
          
          getNotes();
        } else {
          alert("not deleted");
        }
      })
      .catch((err) => alert(err));

    
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully");
          getNotes();
        } else {
          alert("Note not created");
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <h1>Home</h1>

      <form onSubmit={createNote}>
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="title" />

        <textarea name="" id="" placeholder="content" onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="submit" value="submit" />
      </form>

      {notes.map((note, i) => (
        <div key={i}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{new Date(note.created_at).toLocaleDateString('en-Us')}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Home;
