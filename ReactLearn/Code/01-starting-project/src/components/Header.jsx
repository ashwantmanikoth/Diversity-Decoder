import reactImg from '../assets/react-core-concepts.png'

export default function Header(){
    return (
      <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>DE Decoder</h1>
        <p>
          Fundamental React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
      );
  }