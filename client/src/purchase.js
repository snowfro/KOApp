import React from 'react';
import Canvas from './canvas2';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class Purchase extends React.Component{
  constructor(props){
  super(props);
  this.state = {purchaseType:null, shipType:null, stackId:null, creditSale:false, width:null, height:null}
  this.handleTypeRadio = this.handleTypeRadio.bind(this);
  this.handleShipRadio = this.handleShipRadio.bind(this);
  this.handleGoBack = this.handleGoBack.bind(this);
  this.handlePurchase = this.handlePurchase.bind(this);
  this.handleStartOver = this.handleStartOver.bind(this);
  this.handleWidthAndHeight = this.handleWidthAndHeight.bind(this);
}

handleWidthAndHeight(w,h){
  this.setState({width:w, height:h});
}

handleGoBack(){
  this.props.handleWelcomeChange(-1);
}

handleStartOver(){
  this.props.handleWelcomeChange(-2);
}
  handleTypeRadio (event){
    this.setState({purchaseType:event.target.value});
  }

  handleShipRadio (event){
    this.setState({shipType:event.target.value});
  }

  findPrice(){
    if (this.state.purchaseType === "Print + NFC"){
      if (this.state.shipType === "Domestic") {
        return 'pricePerPrintInWei';
      } else {
        return 'pricePerPrintIntlShipInWei'
      }
    } else if (this.state.purchaseType === "NFC Only") {
      if (this.state.shipType === "Domestic") {
      return 'pricePerNFCInWei';
    } else {
      return 'pricePerNFCIntlShipInWei';
    }
  }
  }

handlePurchase(purchaseType){
  let stackId;
  const { drizzle, drizzleState } = this.props;
  const contract1 = drizzle.contracts.KOPrintRegistry;
  const contract2 = drizzle.contracts.KOPrintRegistryMinter;
  let purchaseFunc='';

  if (purchaseType === 'pricePerPrintInWei' || purchaseType === 'pricePerPrintIntlShipInWei'){
    purchaseFunc = 'purchasePrint'
  } else if (purchaseType === 'pricePerNFCInWei' || purchaseType === 'pricePerNFCIntlShipInWei'){
    purchaseFunc = 'purchaseNFCOnly'
  } else {
    purchaseFunc = 'purchaseMisc'
  }

console.log("type: "+purchaseType + " Func: "+ purchaseFunc);

  const determineAmount = drizzleState.contracts.KOPrintRegistry[purchaseType];
  const amountToSend = determineAmount['0x0'].value;
  console.log("sending "+ amountToSend + "contact "+this.props.contactMethod + "Art " + this.props.artId+ "using: "+ purchaseFunc);

  const creditPurchaseConcat = "Credit purchase | " + purchaseFunc + " | " + this.props.contactMethod;
  const creditsToUse = this.props.drizzleState.contracts.KOPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];

  if (creditsToUse && creditsToUse.value>0){
    this.setState({creditSale:true});
    stackId = contract2.methods['mint'].cacheSend(this.props.artId,creditPurchaseConcat, {
      from: drizzleState.accounts[0],
      value: 0
    });
  } else {
  stackId = contract1.methods[purchaseFunc].cacheSend(this.props.artId,this.props.contactMethod, {
    from: drizzleState.accounts[0],
    value: amountToSend
  });
}
  // save the `stackId` for later reference
  this.setState({ stackId });
};

getStatus(){
  const { transactions, transactionStack } = this.props.drizzleState;
  // get the transaction hash using our saved `stackId`
  const txHash = transactionStack[this.state.stackId];
  // if transaction hash does not exist, don't display anything
  if (!txHash) return null;

  if (transactions[txHash]){
  console.log(transactions[txHash].status);
  return transactions[txHash].status;
}
}

getTokenId(){
  const {transactions, transactionStack } = this.props.drizzleState;
  const txHash = transactionStack[this.state.stackId];
  if (!txHash) return null;
  if (transactions[txHash]){
    if (transactions[txHash].status==='success'){
      if (this.state.creditSale){
        const newTokenIdHex = transactions[txHash].receipt.events[0].raw.topics[3];
        const newTokenId = parseInt(newTokenIdHex,16);
        console.log('newTokenIdMint: ' + newTokenId);
        return newTokenId;
      } else {
    const newTokenId = transactions[txHash].receipt.events.Transfer.returnValues[2];
    console.log('newTokenIdPurchase: '+newTokenId)
    return newTokenId;
  }
  } else {
    return null;
  }
}
}




  render(){

    console.log('w+h'+this.state.width + ' ' + this.state.height);
    const {contracts} = this.props.drizzle;

    const { KOPrintRegistry } = this.props.drizzleState.contracts;
    const purchaseType = this.findPrice();
    console.log(contracts);
    console.log(this.props.drizzleState);
    //console.log(KOPrintRegistry);
    //console.log(this.findPrice());

    const pricePerPrintInWei = KOPrintRegistry.pricePerPrintInWei['0x0'];
    const pricePerPrintIntlShipInWei = KOPrintRegistry.pricePerPrintIntlShipInWei['0x0'];
    const pricePerNFCInWei = KOPrintRegistry.pricePerNFCInWei['0x0'];
    const pricePerNFCIntlShipInWei = KOPrintRegistry.pricePerNFCIntlShipInWei['0x0'];
    const pricePerMiscInWei = KOPrintRegistry.pricePerMiscInWei['0x0'];
    const pricePerMiscIntlShipInWei = KOPrintRegistry.pricePerMiscIntlShipInWei['0x0'];

    let priceObject = {pricePerPrintInWei: pricePerPrintInWei, pricePerPrintIntlShipInWei:pricePerPrintIntlShipInWei,pricePerNFCInWei:pricePerNFCInWei,pricePerNFCIntlShipInWei:pricePerNFCIntlShipInWei,pricePerMiscInWei:pricePerMiscInWei, pricePerMiscIntlShipInWei:pricePerMiscIntlShipInWei};
    //if (this.findPrice()){ console.log("being bought: "+ this.findPrice());}
    let status = this.getStatus();
    let tokenId = this.getTokenId();
    let url = "http://kopr.artblocks.io/details/";
    if (tokenId) {
      url = url+tokenId;
    }

    const {drizzleState} = this.props;
    const contract = drizzleState.contracts.KOPrintRegistry;
    const creditsToUse = this.props.drizzleState.contracts.KOPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];

    if(creditsToUse){
      console.log('ctu: '+creditsToUse.value);
    }
    return (
      <div>
      <h1>Known Origin Art Print Registry Purchase Page</h1>
      <br />
      <h4>Almost there! Now you will choose your purchase options and complete the transaction for Edition #{this.props.artId}.</h4>
    <Canvas
    imageURI = {contract.getKOTokenURI[this.props.tokenURIKey].value}
    handleWidthAndHeight = {this.handleWidthAndHeight}
    width = {this.state.width}
    height = {this.state.height}
    />
    <br />
    <br />
    <p>There are two ways to proceed. You may purchase <i>an up</i> to 13"x19" (33x48.25cm) high quality digital print with attached authentication NFC
    or if you already have a nice print you can simply buy the NFC sticker for authenticating your own prints. </p>
    <br />
    <p><b>NOTE: </b>Not all artwork is available in high resolution. We will <b>ONLY</b> print art as large as it can be printed while maintaining quality results.
    Please verify resolution of your artwork before purchase. <b>Smart contract transactions are final</b>! </p>
    <br />
    <p>If you purchase a print of a GIF we will print the first frame of the GIF (shown above) as large as we can while maintaining a quality print resolution. Remember you can always purchase just the NFC to authenticate your own print or video installation.</p>
    <br />
    <h4>Your artwork dimensions are {this.state.width && this.state.width}px x {this.state.height && this.state.height}px.</h4>
    <br />
    <p>At an "acceptable" resolution of 150 DPI the maximum print size is {Number(this.state.width/150).toFixed(2)}in/{Number(this.state.width/150*2.54).toFixed(1)}cm x {Number(this.state.height/150).toFixed(2)}in/{Number(this.state.height/150*2.54).toFixed(1)}cm.</p>
    <br/>
    <p>At a "better" resolution of 200 DPI the maximum print size is {Number(this.state.width/200).toFixed(2)}in/{Number(this.state.width/200*2.54).toFixed(1)}cm x {Number(this.state.height/200).toFixed(2)}in/{Number(this.state.height/200*2.54).toFixed(1)}cm.</p>
    <br />
    <p>At an "high" resolution of 300 DPI the maximum print size is {Number(this.state.width/300).toFixed(2)}in/{Number(this.state.width/300*2.54).toFixed(1)}cm x {Number(this.state.height/300).toFixed(2)}in/{Number(this.state.height/300*2.54).toFixed(1)}cm.</p>
    <br />
    <p><i>You may have access to a higher resolution image than what's hosted on IPFS.</i> The gallery page on the Known Origin website might offer you a higher resolution image which we'd be happy to print. If you have any questions please don't hesitate to ask before completing this transaction.</p>
    <br />
    <p>Please select one:</p>
    <br />
    <label><input type="radio" name="purchaseType" value="Print + NFC" onChange={this.handleTypeRadio} />Purchase Print+NFC</label><br />
    <label><input type="radio" name="purchaseType" value="NFC Only" onChange={this.handleTypeRadio} />Purchase NFC Only</label>

    {this.state.purchaseType &&
      <div>
      <h4>Purchase Type: {this.state.purchaseType}</h4>
      <br />
      <p>Now we need to know where this is going. Please select whether you are located in the USA or abroad. Item price will adjust accordingly.</p>
      <label><input type="radio" name="shipType" value="Domestic" onChange={this.handleShipRadio} />Domestic Shipping (within USA)</label><br />
      <label><input type="radio" name="shipType" value="International" onChange={this.handleShipRadio} />International Shipping</label>
      {this.state.shipType &&
      <div>
      <h4>Shiping Type: {this.state.shipType}</h4>
      <br />
      <h4>Total: {creditsToUse && creditsToUse.value>0 ? 'FRE' : priceObject[this.findPrice()] && (web3.utils.fromWei(priceObject[this.findPrice()].value.toString(), 'ether'))}Ξ</h4>
      <br />

      <br />
      <button className = "bigButton" disabled = {status?true:false} onClick={() => {this.handlePurchase(purchaseType)}}>{status?status:'Purchase'}</button>
      {status === 'success' &&
    <div>
    <h1>Congrats!</h1>
    <h4>Your transaction is complete! Please reach out to info@artblocks.io or Snowfro#8886 on Discord using the recorded contact method
    so we can get your package to you ASAP.</h4>
    <br />
    <h4>Your Print Registry TokenId for this transaction is {tokenId}. Click here to visit your authentication
    page at <a href={url}>{url}</a>! Note that the NFC ID info will vary and will will be set manually at time of printing.</h4>
    <br />
    <p> You will be provided with a tracking number once your package has shipped. Please allow 1-2 weeks for delivery.</p>

  </div>
}
      </div>
    }
      </div>
    }
    <br />
    <br />
    <button onClick = {status==='success'? this.handleStartOver : this.handleGoBack}>{status==='success'?'Start Over':'Go Back'}</button>
    </div>
  )
  }

}

export default Purchase;
