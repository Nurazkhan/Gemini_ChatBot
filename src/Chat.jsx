import React from 'react';

function Chat(props) {
  let { history } = props;

  let chatd = document.getElementById('chat')

  history = history ? history.slice(2): history
  return (
    <div className='chat' id='chat'>
      {history.map((el, index) => (
        
        <div key={index} className={el['role'] === 'user' ? 'messageUser' : 'messageBot'}>
          {el['parts'][0]['text']}
        </div>
))}
    </div>
  );
}

export default Chat;
