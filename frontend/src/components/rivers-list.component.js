import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const River = props => (

    <tr>
        <td>{props.river.river_name}</td>
        <td>{props.river.river_length}</td>
        <td>{props.river.river_depth}</td>
        <td>
            <Link to={"/edit/" + props.river._id}><button className="btn btn-warning" style={{paddingTop: 0, paddingBottom: 0}}>Edit</button></Link>
        </td>
    </tr>
);

export default class RiversList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rivers: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/rivers/')
            .then(response => {
                this.setState({ rivers: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    // componentDidUpdate() {
    //     axios.get('http://localhost:8080/rivers/')
    //         .then(response => {
    //             this.setState({ rivers: response.data });
    //         })
    //         .catch(function (error){
    //             console.log(error);
    //         })
    // }
    

    riverList() {
        return this.state.rivers.map(function (currentRiver, i) {
            return <River river={currentRiver} key={i}/>
        })
    }
    render() {
        return (
            <div>
                <h3>Rivers list</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Length</th>
                        <th>Depth</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.riverList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
