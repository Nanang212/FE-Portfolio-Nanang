import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Experience from './Pages/Experience';
import Skills from './Pages/Skills';
import Contact from './Pages/Contact';

// Import local JSON data
import dbData from './data.json';
import './index.css';
import './i18n';

function App() {
  const { about, projects, skills, experiences } = dbData;

  // Group skills by category as expected by Skills.jsx (backend returned grouped collection)
  // Let's assume skills are already flat from db, we need to group them by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home about={about} projects={projects} skills={groupedSkills} />} />
        <Route path="/about" element={<About about={about} />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
        <Route path="/experience" element={<Experience experiences={experiences} />} />
        <Route path="/skills" element={<Skills skills={groupedSkills} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
