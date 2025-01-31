import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const generatePassword = () => {
    const UpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LowerCase = UpperCase.toLowerCase();
    const Numbers = "0123456789";
    const Symbols = "!@#$%^&*()_+-=[]{}|;':,./<>?";
    const Emojis =
      "😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😗😙😚🙂🤗🤔🤭🧐🤐🤨😐😑😶🫠😶‍🔥😏😣😥😮😯😪😫😴😌🤓😛😜🤤🤢😝🤧😒😓😔😕🙃🤑😲";
    let possibleCharacters = "";

    if (includeUppercase) possibleCharacters += UpperCase;
    if (includeLowercase) possibleCharacters += LowerCase;
    if (includeNumbers) possibleCharacters += Numbers;
    if (includeSymbols) possibleCharacters += Symbols;
    if (includeEmojis) possibleCharacters += Emojis;

    let aux = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      aux += possibleCharacters[randomIndex];
    }
    setPassword(aux);
    calcStrength(aux);
  };

  const calcStrength = (password) => {
    let aux = 0;
    if (password.length < 10) aux = +1;
    if (password.length < 20) aux += 2;
    if (password.length > 20) aux += 3;

    if (includeEmojis) aux += 2;
    if (includeSymbols) aux += 2;
    if (includeNumbers) aux += 1;
    if (includeLowercase) aux += 1;
    if (includeUppercase) aux += 1;

    if (aux < 4) {
      setStrength("Fácil");
    } else if (aux < 7) {
      setStrength("Moderada");
    } else {
      setStrength("Difícil");
    }
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };
  return (
    <div className="container">
      <h2>Gerador de senhas</h2>
      <div className="password-box">
        {password || "Sua senha aparecerá aqui"}
        <p>Força: {strength}</p>
      </div>
      <input
        type="range"
        min="6"
        max="32"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <p>Comprimento: {length}</p>

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />{" "}
          Letras Maiúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />{" "}
          Letras Minúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />{" "}
          Números
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />{" "}
          Símbolos
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeEmojis}
            onChange={() => setIncludeEmojis(!includeEmojis)}
          />{" "}
          Emojis
        </label>
      </div>
      <button className="btn" onClick={generatePassword}>
        Gerar Senha
      </button>
      <button className="btn" onClick={copyPassword}>
        Copiar
      </button>
    </div>
  );
}

export default App;
