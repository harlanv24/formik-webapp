import React from 'react';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: 'Other- Please Specify'
        };
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,25)})
    }

    render() {
        return (
            <input type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}/>
        )
    }
}

export default TextField;