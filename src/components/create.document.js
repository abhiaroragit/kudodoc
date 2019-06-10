import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeDocumentName = this.onChangeDocumentName.bind(this);
    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      document_name: '',
      effective_date_from: '',
      effective_date_to: '',
      custom_fields:[{key:'', val:''}]
    }
  }
  onChangeDocumentName(e) {
    this.setState({
      document_name: e.target.value
    });
  }
  onChangeFromDate(e) {
    this.setState({
      effective_date_from: e.target.value
    })  
  }
  onChangeToDate(e) {
    this.setState({
      effective_date_to: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      document_name: this.state.document_name,
      effective_date_from: this.state.effective_date_from,
      effective_date_to: this.state.effective_date_to
    };
    axios.post('http://localhost:4000/business/add', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      document_name: '',
      effective_date_from: '',
      effective_date_to: '',
      custom_fields:''
    })
  }
  addAttribute = (e) => {
    this.setState((prevState) => ({
      custom_fields: [...prevState.custom_fields, {key:"", val:""}],
    }));
  }
  handleSubmit = (e) => { e.preventDefault() }
  render() {
    let {document_name,effective_date_from,effective_date_to,custom_fields} = this.state
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Add New Document</h3>
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <div className="form-group">
                    <label>Document Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={document_name}
                      onChange={this.onChangeDocumentName}
                      />
                </div>
                <div className="form-group">
                    <label>Effective From </label>
                    <input type="date" 
                      className="form-control"
                      value={effective_date_from}
                      onChange={this.onChangeFromDate}
                      />
                </div>
                <div className="form-group">
                    <label>Effective To </label>
                    <input type="date" 
                      className="form-control"
                      value={effective_date_to}
                      onChange={this.onChangeToDate}
                      />
                </div>
                
                {
                    custom_fields.map((val, idx)=> {
                      let attrid = `key-${idx}`, valId = `val-${idx}`
                      return (
                        <div key={idx}>
                          <label htmlFor={attrid}>{`Attribute #${idx + 1}`}</label>
                          <input
                            type="text"
                            name={attrid}
                            data-id={idx}
                            id={attrid}
                            className="form-control"
                          />
                          <label htmlFor={valId}>Value</label>
                          <input
                            type="text"
                            name={valId}
                            data-id={idx}
                            id={valId}
                            className="form-control"
                          />
                        </div>
                      )
                    })
                  }
                  <button onClick={this.addAttribute} >Add Attribute</button>
                <div className="form-group">
                    <input type="submit" 
                      value="Submit Document" 
                      className="btn btn-primary"/>
                </div>
            </form>
          
            <form action="/api/upload" enctype="multipart/form-data" method="POST"> 
              <input type="file" name="myFile" />
              <input type="submit" value="Upload a file"/>
            </form>
 
        </div>
    )
  }
}