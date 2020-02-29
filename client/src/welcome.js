import React from "react";
import PriceList from './priceList';


class Welcome extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="jumbotron">
                    <h1 className="display-4">KnownOrigin Print Registry Store </h1>
                    <p className="lead mt-2">Welcome. A one-stop shop to purchase authentication for your <a
                        href="https://www.knownorigin.io">KnownOrigin</a> Artwork</p>
                    <hr className="my-4"></hr>
                    <p className="">There are two purchase options to choose from:</p>
                    <div className="row">
                        <div className="col m-4 alert alert-info">
                            <h4>High Quality Print: </h4>
                            A 13" x 19" (or smaller) high quality print of your artwork with authentication NFC. <br/>
                            <span className="small">Print size is limited to artwork resolution.</span>
                        </div>
                        <div className="col m-4 alert alert-info">
                            <h4>Authentication NFC: </h4>
                            An authentication NFC sticker that you can attach to a print you already have.
                        </div>
                    </div>
                    <div className="alert">You will be transacting directly through the KO Artwork Print Registry Smart Contract.
                        In other words, the storefront itself is a smart contract.
                        <br/>In order to purchase an artwork print or NFC, you must have ownership of that artwork in
                        your wallet <i>that you send the funds from</i>.
                    </div>
                    {/*<p>The Print Registry Store will reject your transaction if you do not send funds from the "owner"*/}
                    {/*    address. </p>*/}
                    <div className="alert alert-warning">
                        In order to maintain your privacy, We will simply ask for a communication method such as an e-mail or Discord handle so we can use to verify the source of shipping information.
                        <br/>This data will be deleted after you receive your print or NFC
                    </div>

                    <PriceList
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                    />
                </div>
            </div>
        );
    }
}

export default Welcome;
