import React from 'react';
import Canvas from './canvas2';

class GetInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {stage:1,width:null, height:null}
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleArtIdChange = this.handleArtIdChange.bind(this);
    this.getURI = this.getURI.bind(this);
    this.handleWidthAndHeight = this.handleWidthAndHeight.bind(this)

  }

  handleWidthAndHeight(w,h){
    this.setState({width:w, height:h});
  }

  handleArtIdChange(event){
      this.props.setArtId(event.target.value);

  }



  getURI(){
    const {drizzle} = this.props;
    const contract = drizzle.contracts.KOPrintRegistry;
    let uriDataKey = contract.methods['getKOTokenURI'].cacheCall(this.props.artId);
    this.props.setTokenURIKey(uriDataKey);

  }

  getArtCreditsToUse(){
    const {drizzle} = this.props;
    const contract = drizzle.contracts.KOPrintRegistryMinter;
    let artCreditsToUseDataKey = contract.methods['artIdToCreditsToSpend'].cacheCall(this.props.artId);
    this.props.setArtCreditsToUse(artCreditsToUseDataKey);
  }

  handleClick(){
  this.props.handleWelcomeChange(-1);
  }

  handleBackClick(){
    //let stage = this.state.stage + direction;
    this.setState({stage: this.state.stage-1});
    this.props.setTokenURIKey(null);

  }


  handleNextClick(){

    this.setState({stage: this.state.stage+1});
    if (this.state.stage===2){
      console.log('tag');
      this.getURI();
      this.getArtCreditsToUse();
    }

    if (this.state.stage>2){

      this.props.handleWelcomeChange(1);

    }

  }

  handleContactMethodChange(event){
    this.props.addContactMethod(event.target.value);
  }

  handleFirstNameChange(event){
    this.props.handleAddressInput('firstName', event.target.value);
  }

  handleLastNameChange(event){
    this.props.handleAddressInput('lastName', event.target.value);
  }

  handleAddress1Change(event){
    this.props.handleAddressInput('address1', event.target.value);
  }

  handleAddress2Change(event){
    this.props.handleAddressInput('address2', event.target.value);
  }

  handleCityChange(event){
    this.props.handleAddressInput('city', event.target.value);
  }

  handleStateProvChange(event){
    this.props.handleAddressInput('stateProv', event.target.value);
  }

  handleZipChange(event){
    this.props.handleAddressInput('zip', event.target.value);
  }

  handleCountryChange(event){
    this.props.handleAddressInput('country', event.target.value);
  }

render(){


const {drizzleState} = this.props;
const contract = drizzleState.contracts.KOPrintRegistry;
const minter = drizzleState.contracts.KOPrintRegistryMinter;
console.log(contract);
console.log('URIKEY '+this.props.tokenURIKey);
console.log('art '+this.props.artId);

console.log('w+h'+this.state.width + ' ' + this.state.height);
console.log('art credits to use key: '+ this.props.artCreditsToUse);

if (minter.artIdToCreditsToSpend[this.props.artCreditsToUse]){
  console.log('art credits: '+ minter.artIdToCreditsToSpend[this.props.artCreditsToUse].value);
}

  return (
  <div className="container mt-5">
  <div className="jumbotron">
    <div>
    <h1>Known Origin Art Registry Store</h1>
    <br />
    <h4>Step 1: Provide Contact and Shipping Info</h4>
    <br />
    <p>Please fill out your contact details below. Note that the contact method you provide will be included in your purchase transaction and recorded on the blockchain.
    This will be our only way to contact you in case we need clarification about your order.</p>
    <small id="contactMethodHelp" className="form-text text-muted">Possible contact methods include e-mail address, twitter handle, or <b>full</b> Discord handle (including numerical ID).</small>

    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="contact-method">Contact Method:</span>
      </div>
      <input type="text" value={this.props.contactMethod} className="form-control" aria-label="Contact Method" aria-describedby="contact-method" disabled={this.state.stage>1} onChange={this.handleContactMethodChange.bind(this)} />
    </div>

    <div className="form-group row mb-3">
        <div className="input-group col-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="first-name">First Name:</span>
          </div>
          <input type="text" value={this.props.address.firstName} className="form-control" aria-label="First Name" aria-describedby="first-name" disabled={this.state.stage>1} onChange={this.handleFirstNameChange.bind(this)} />
        </div>
        <div className="input-group col-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="last-name">Last Name:</span>
          </div>
          <input type="text" value={this.props.address.lastName} className="form-control" aria-label="Last Name" aria-describedby="last-name" disabled={this.state.stage>1} onChange={this.handleLastNameChange.bind(this)} />
        </div>
    </div>

    <div className="form-group row mb-3">
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="address1">Address 1:</span>
        </div>
        <input type="text" value={this.props.address.address1} className="form-control" aria-label="Address 1" aria-describedby="address2" disabled={this.state.stage>1} onChange={this.handleAddress1Change.bind(this)} />
      </div>
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="address2">Address 2:</span>
        </div>
        <input type="text" value={this.props.address.address2} className="form-control" aria-label="Address 2" aria-describedby="address2" disabled={this.state.stage>1} onChange={this.handleAddress2Change.bind(this)} />
        </div>
    </div>

    <div className="form-group row mb-3">
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="city">City:</span>
        </div>
        <input type="text" value={this.props.address.city} className="form-control" aria-label="City" aria-describedby="city" disabled={this.state.stage>1} onChange={this.handleCityChange.bind(this)} />
      </div>
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="state">State/Province/Region:</span>
        </div>
        <input type="text" value={this.props.address.stateProv} className="form-control" aria-label="State" aria-describedby="state" disabled={this.state.stage>1} onChange={this.handleStateProvChange.bind(this)} />
      </div>
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="zip">ZIP/Postal Code:</span>
        </div>
        <input type="text" value={this.props.address.zip} className="form-control" aria-label="ZIP" aria-describedby="zip" disabled={this.state.stage>1} onChange={this.handleZipChange.bind(this)} />
      </div>
    </div>

    <div className="form-group row mb-3">
      <div className="input-group col">
        <div className="input-group-prepend">
          <span className="input-group-text" id="country">Country:</span>
        </div>
        <input type="text" value={this.props.address.country} className="form-control" aria-label="Country" aria-describedby="country" disabled={this.state.stage>1} onChange={this.handleCountryChange.bind(this)} />
      </div>
    </div>

    <br />
    <div className="alert alert-warning">
    <p>Please take an extra moment to verify your address and contact method before proceeding. </p>
    </div>
    <div className="alert alert-danger">
    <p><b>We will use the above information solely for shipping purposes and will not share the information under any circumstances.</b></p>
    </div>

    {this.state.stage>1 &&
      <div>
        <br />
        <h4>Step 2: Choose Your Artwork</h4>
        <br />
        <p>Great! Now we need to choose a Known Origin work. Please type in your Edition Number in the box below and click "next step".</p>
        <br />
        <input type="number" id="artIdField" disabled={this.state.stage>2} onChange={this.handleArtIdChange.bind(this)} />
      </div>}

        {this.state.stage>2 &&
          <div>
            {contract.getKOTokenURI[this.props.tokenURIKey] && !contract.getKOTokenURI[this.props.tokenURIKey].value &&
              <h4>This is not a valid token! Please try again.</h4>
            }

            {contract.getKOTokenURI[this.props.tokenURIKey] && contract.getKOTokenURI[this.props.tokenURIKey].value &&
              <div>
          <h4>Step 3: Verify Artwork</h4>
          <br />
          <p>Is this your art? If so click "CONFIRM" below to go to purchase options.</p>


        <Canvas
        imageURI = {contract.getKOTokenURI[this.props.tokenURIKey].value}
        handleWidthAndHeight = {this.handleWidthAndHeight}
        width = {this.state.width}
        height = {this.state.height}
        />

        </div>
      }

        {minter.artIdToCreditsToSpend[this.props.artCreditsToUse] && minter.artIdToCreditsToSpend[this.props.artCreditsToUse].value>0 &&
          <div className='alert alert-success'>
            <h4>This Edition has a free print credit!</h4>
          </div>

            }

        </div>
      }


    <button onClick = {this.handleBackClick} disabled={this.state.stage>1?false:true} className={this.state.stage>1?null:"hidden"}>Previous Step</button><button onClick = {this.handleNextClick} disabled={!this.props.artId&&this.state.stage>1 ? true: contract.getKOTokenURI[this.props.tokenURIKey] && !contract.getKOTokenURI[this.props.tokenURIKey].value?true: false} >{this.state.stage>2?"CONFIRM":"Next Step"}</button>
    <br />
    <br />
    <br />
    <button onClick = {this.handleClick}>Back To Start</button>
    </div>

  </div>
  </div>
)
  }
}


export default GetInfo;
