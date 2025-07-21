import { useState, useEffect, useRef, useContext } from 'react'
import { ProductContext } from '../Context/ProductContext.jsx';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function AiAssistant({ productInfo }) {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/productDetails');
  const { products: AllProducts } = useContext(ProductContext);
  const relatedProducts = AllProducts
    .filter(product => product.id !== productInfo.id)
    .map(product => `- ${product.name} (${product.category}): ${product.description}`)
    .join('\n');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesContainerRef = useRef(null);


  const promptContext = isProductPage && productInfo ? `
  SEZIONE PRODOTTO VISUALIZZATO:
  Product: ${productInfo.name}
  STATO PREZZO: ${productInfo.is_promo ? ' PRODOTTO IN PROMOZIONE ' : 'Prezzo Standard'}

  PREZZI:
  ${productInfo.is_promo ?
      `- Prezzo Originale: ${productInfo.price}€
     - Prezzo Attuale SCONTATO: ${productInfo.discount_price}€
      ATTENZIONE: ${productInfo.discount_price}€ è il PREZZO SCONTATO ATTUALE`
      :
      `Prezzo Standard: ${productInfo.price}€ (non in promozione)`
    }

  Description: ${productInfo.description}
  Category: ${productInfo.category}
  Stock Quantity: ${productInfo.stockQuantity}

  ISTRUZIONI PREZZI:
  - Questo prodotto ${productInfo.is_promo ? 'È IN PROMOZIONE' : 'non è in promozione'}
  - Prezzo originale: ${productInfo.price}€
  - ${productInfo.is_promo ? `Prezzo SCONTATO ATTUALE: ${productInfo.discount_price}€` : ''}
  - ${productInfo.is_promo ? 'RICORDA: il prezzo più basso è quello SCONTATO' : ''}

  SEZIONE PRODOTTI CORRELATI PER ABBINAMENTI E CONSIGLI : 
  ${relatedProducts}
` : `Hai bisogno di aiuto ? posso consigliarti prodotti e abbinamenti, dimmi pure cosa cerchi`

  const [chatMessages, setChatMessages] = useState([
    {
      type: 'system',
      role: 'system',
      content: promptContext
    },
    {
      type: 'bot',
      content: 'Ciao, sono il tuo personal shopper. Come posso aiutarti?'
    }
  ]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    setChatMessages([
      {
        type: 'system',
        role: 'system',
        content: promptContext
      },
      {
        type: 'bot',
        content: 'Ciao, sono il tuo personal shopper. Come posso aiutarti?'
      }
    ]);
  }, [productInfo, promptContext]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const conversation = {
      question,
      history: chatMessages.map(msg => ({
        role: msg.type === 'system' ? 'system' : msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    };

    setChatMessages(chat => [...chat, { type: 'user', content: question }]);

    axios.post('http://localhost:3000/products/bot', conversation)
      .then(response => {
        let botResponse = response.data.answers[0].answer;
        try {
          const jsonResponse = JSON.parse(botResponse);
          botResponse = jsonResponse.answer || botResponse;
        } catch (e) {
          // Se non è JSON, usiamo la risposta così com'è
        }
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

          <div
            className="chat-messages"
            ref={messagesContainerRef}
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '1rem',
              scrollBehavior: 'smooth'
            }}
          >
            {chatMessages.slice(1).map((msg, index) => {
              if (msg.type === 'bot') {
                const lines = msg.content.split('\n');
                const recommendationLine = lines.find(line => line.startsWith('PRODOTTO_RACCOMANDATO:'));
                const visibleText = lines.filter(line => !line.startsWith('PRODOTTO_RACCOMANDATO:')).join('\n');

                let recommendedProduct = null;
                if (recommendationLine) {
                  const [slug, name, category] = recommendationLine.replace('PRODOTTO_RACCOMANDATO:', '').trim().split('|');
                  recommendedProduct = AllProducts.find(p => p.slug === slug);
                }

                return (
                  <div key={index} className="message bot">
                    <p>{visibleText}</p>
                    {recommendedProduct && (
                      <div className="product-recommendation">
                        <img
                          src={recommendedProduct.image_url}
                          alt={recommendedProduct.name}
                          style={{ width: '100px', borderRadius: '8px', marginTop: '8px' }}
                        />
                        <Link
                          to={`/productDetails/${recommendedProduct.slug}`}
                          style={{ fontWeight: 'bold', margin: '4px 0', display: 'block', textDecoration: 'none', color: '#333' }}
                        >
                          {recommendedProduct.name}
                        </Link>

                        <p style={{ margin: 0 }}>{recommendedProduct.is_promo
                          ? `Prezzo scontato: ${recommendedProduct.discount_price}€ (originale: ${recommendedProduct.price}€)`
                          : `Prezzo: ${recommendedProduct.price}€`
                        }</p>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.content}
                </div>
              );
            })}


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
  );
}

export default AiAssistant;