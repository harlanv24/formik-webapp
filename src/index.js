import React from 'react';
import ReactDOM from 'react-dom'
const styled = styled.default;

const BasicNotification = styled.p`
    background: lightblue;
    padding: 5px;
    margin: 5px;
    color: black;
`;

const SuccessNotification = styled(BasicNotification)`
    background: lightgreen;
`;

const ErrorNotification = styled(BasicNotification)`
    background: lightcoral;
    font-weight: bold;  
`;

class Application extends React.Component {
  render() {
    return (
      <div>
        <BasicNotification>Basic Message</BasicNotification>
        <SuccessNotification>Success Message</SuccessNotification>
        <ErrorNotification>Error Message</ErrorNotification>
      </div>
    )
  }
}

ReactDOM.render(<Application />, document.getElementById('content'));
