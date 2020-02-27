import React from "react";


class Welcome extends React.Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="jumbotron">
                    <h1 className="display-4">KnownOrigin Print Registry Store </h1>
                    <p className="lead mt-2">Welcome. A one-stop shop to purchase authentication for your <a href="https://www.knownorigin.io">KnownOrigin</a> Artwork</p>
                    <hr className="my-4"></hr>
                        <p>It uses utility classes for typography and spacing to space content out within the larger
                            container.</p>
                </div>

                <p>There are two purchase options to choose from:</p>
                <br/>
                <ul>
                    <li>A 13"x19" (or smaller) high quality print of your artwork with authentication NFC. Print size is
                        limited to artwork resolution.
                    </li>
                    <li>An authentication NFC sticker that you can attatch to a print you already have.</li>
                </ul>
                <br/>
                <p>You will be transacting directly through the KO Artwork Print Registry Smart Contract. In other
                    words,
                    the storefront itself is a smart contract. In order to purchase an artwork print or NFC, <b>you must
                        have ownership
                        of that artwork in the Ethereum address <i>that you send the funds from</i></b>.</p>
                <br/>
                <p>The Print Registry Store will reject your transaction if you do not send funds from the "owner"
                    address. </p>
                <br/>
                <p>In order to maintain your privacy, you will not be sending shipping information to the smart contract
                    along with your transaction.
                    Instead you will simply provide a communication method such as an e-mail address or full Discord
                    handle that that we can use to verify
                    the source of shipping information.
                </p>
                <br/>
                <p> This contact method will be deleted after you receive your print or NFC.</p>
                <br/>
            </div>
        );
    }
}

export default Welcome;
