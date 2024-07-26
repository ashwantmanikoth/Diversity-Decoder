import Header from "./components/headerbox/Header";
import { CORE_CONCEPTS } from "./data";
import InputJobAd from "./components/TextBox/InputJobAd";
import { useState } from "react";
import DisplayOutputBox from "./components/TextBox/DisplayOutputBox";
function App() {

  const [backendData, setBackendData] = useState([]);
  const [error, setError] = useState(null);

  const [text, setText] = useState('');

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleTextSubmit = async (text) => {
    try{
    // Replace with your backend API call
    const response = await fetch('http://localhost:8080/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data.results);
    setBackendData(data.results || []); // Ensure 'results' is an array
    setError(null); // Clear any previous errors
  }catch(error){
    setError(error.message); // Show the error message
  }
};



  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
        <InputJobAd onSubmit={handleTextSubmit} />
        <DisplayOutputBox data={backendData}/>


        <section id="core-concepts">
          <h2>What does DEI decoder do?</h2>
          <ul>
            <CoreConcept
              image={CORE_CONCEPTS[0].image}
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
            />
            <CoreConcept
              image={CORE_CONCEPTS[1].image} alt={CORE_CONCEPTS[1].title}
              title={CORE_CONCEPTS[1].title}
              description={CORE_CONCEPTS[1].description}
            />
            <CoreConcept
              image={CORE_CONCEPTS[2].image}
              title={CORE_CONCEPTS[2].title}
              description={CORE_CONCEPTS[2].description}
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

function CoreConcept({ image, title, description }) {
  return (

    <li>
      <img src={image} />
      <h1>{title}</h1>
      <p>{description}</p>

    </li>


  );
}

export default App;
