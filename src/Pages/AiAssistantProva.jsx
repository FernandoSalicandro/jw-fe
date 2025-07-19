import { useState } from 'react'
import axios from 'axios';

function AiAssistant() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Crea l'oggetto conversazione che include la cronologia
    const conversation = {
      question,
      history: chatMessages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    };

    // Aggiungi il messaggio dell'utente alla chat
    setChatMessages(prev => [...prev, { type: 'user', content: question }]);

    axios.post('http://localhost:3000/products/bot', conversation)
      .then(response => {
        const botResponse = response.data.answers[0].answer;
        setChatMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      })
      .catch(error => {
        console.error('Errore:', error);
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'Mi dispiace, si è verificato un errore nella comunicazione.'
        }]);
      })
      .finally(() => {
        setIsLoading(false);
        setQuestion('');
      });
  }

  return (
    <>
      <div className='bot-trigger' onClick={() => setIsChatOpen(!isChatOpen)}>
        JW AI
      </div>

      {isChatOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h5>JW Assistant</h5>
            <button className="close-btn" onClick={() => setIsChatOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-messages">
            {/* Messaggio di benvenuto iniziale */}
            {chatMessages.length === 0 && (
              <div className="message bot">
                Ciao! Sono il tuo assistente JW. Come posso aiutarti?
              </div>
            )}
            
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleQuestionSubmit} className="chat-input-container">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className='chat-input'
              type="text"
              placeholder='Scrivi qui la tua domanda'
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="send-button"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AiAssistant