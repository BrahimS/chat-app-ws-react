import React from 'react';

function App() {
	const [socket, setSocket] = React.useState<WebSocket | null>(null);
	const [messages, setMessages] = React.useState<string[]>([]);
	const [inputValue, setInputValue] = React.useState<string>('');

	React.useEffect(() => {
		const ws = new WebSocket('ws://localhost:7500');
		setSocket(ws);

		ws.onmessage = (event) => {
			console.log(event.data);
			setMessages((pre) => [...pre, event.data]);
		};
		return () => {
			ws.close();
		};
	}, []);
	const sendMessage = () => {
		if (socket && inputValue.trim() !== '') {
			socket.send(inputValue.trim());
			setInputValue('');
		}
	};
	return (
		<section className="chat-container">
			<ul className="messages">
				{messages.map((message, index) => (
					<li key={index}>{message}</li>
				))}
			</ul>
			<div className="input-area">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
					placeholder="Tapez un message..."
				/>
				<button onClick={sendMessage}>Envoyer</button>
			</div>
		</section>
	);
}

export default App;
