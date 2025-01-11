import React from 'react';

function Chat(props) {
  const { history } = props;

  return (
    <div className='chat'>
      {history.map((el, index) => (
        <div key={index} className={el['role'] === 'user' ? 'messageUser' : 'messageBot'}>
          {el['parts'][0]['text']}
        </div>
      ))}
    </div>
  );
}

export default Chat;
