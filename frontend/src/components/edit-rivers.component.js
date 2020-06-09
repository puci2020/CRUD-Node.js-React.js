import React, {Component} from 'react';
import axios from 'axios';

export default class EditRivers extends Component {

    constructor(props) {
        super(props);

        this.onChangeRiverName = this.onChangeRiverName.bind(this);
        this.onChangeRiverLength = this.onChangeRiverLength.bind(this);
        this.onChangeRiverDepth = this.onChangeRiverDepth.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.Delete= this.Delete.bind(this);

        this.state = {
            river_name: '',
            river_length: '',
            river_depth: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/rivers/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    river_name: response.data.river_name,
                    river_length: response.data.river_length,
                    river_depth: response.data.river_depth,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onChangeRiverName(e){
        this.setState({
            river_name: e.target.value
        });
    }

    onChangeRiverLength(e){
        this.setState({
            river_length: e.target.value
        });
    }

    onChangeRiverDepth(e){
        this.setState({
            river_depth: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();
        const obj = {
            river_name: this.state.river_name,
            river_length: this.state.river_length,
            river_depth: this.state.river_depth,
        };
        axios.post('http://localhost:8080/rivers/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
        // window.location.reload(false);
    }

    Delete(){
        axios.delete('http://localhost:8080/rivers/' + this.props.match.params.id)
            .then(res => console.log(res.data));

        this.props.history.push('/');
        // window.location.reload(false);
    }

    render() {
        return (
            <div style={{width: 400}}>
                <h3>Update River</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                               className="form-control"

                               onChange={this.onChangeRiverName}/>
                    </div>
                    <div className="form-group">
                        <label>Length: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.river_length}
                               onChange={this.onChangeRiverLength}/>
                    </div>
                    <div className="form-group">
                        <label>Depth: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.river_depth}
                               onChange={this.onChangeRiverDepth}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update River" className="btn btn-primary"/>
                        <input type="button" style={{marginLeft: 10}} value="Remove River" onClick={this.Delete} className="btn btn-danger"/>
                    </div>
                </form>
            </div>
        )
    }
}
