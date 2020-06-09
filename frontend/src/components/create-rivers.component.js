import React, {Component} from 'react';
import axios from 'axios';

export default class CreateRivers extends Component {

    constructor(props) {
        super(props);

        this.onChangeRiverName = this.onChangeRiverName.bind(this);
        this.onChangeRiverLength = this.onChangeRiverLength.bind(this);
        this.onChangeRiverDepth = this.onChangeRiverDepth.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            river_name: '',
            river_length: '',
            river_depth: ''

        }
    }

    onChangeRiverName(e) {
        this.setState({
            river_name: e.target.value
        });
    }

    onChangeRiverLength(e) {
        this.setState({
            river_length: e.target.value
        });
    }

    onChangeRiverDepth(e) {
        this.setState({
            river_depth: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted: `);
        console.log(`River name: ${this.state.river_name} `);
        console.log(`River length: ${this.state.river_length} `);
        console.log(`River depth: ${this.state.river_depth} `);

        const newRiver = {
            river_name: this.state.river_name,
            river_length: this.state.river_length,
            river_depth: this.state.river_depth,

        };

        axios.post('http://localhost:8080/rivers/add', newRiver)
            .then(res => console.log(res.data));

        this.setState({
            river_name: '',
            river_length: '',
            river_depth: '',
        })
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div style={{marginTop: 10, width: 400}}>
                    <h3>Create new River</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" className="form-control" value={this.state.river_name}
                                   onChange={this.onChangeRiverName}/>
                        </div>
                        <div className="form-group">
                            <label>Length: </label>
                            <input type="text" className="form-control" value={this.state.river_length}
                                   onChange={this.onChangeRiverLength}/>
                        </div>
                        <div className="form-group">
                            <label>Depth: </label>
                            <input type="text" className="form-control" value={this.state.river_depth}
                                   onChange={this.onChangeRiverDepth}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create river" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
