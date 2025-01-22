import "./App.css";
import { ChatBot } from "./components/app/chat-bot";
import { initializeCSSVariables } from "./utils/initialize-css-variables";

function App() {
  const primaryColor = "#010101"; // "#ee2a7b"
  initializeCSSVariables(primaryColor);

  return <ChatBot />;
}

export default App;
