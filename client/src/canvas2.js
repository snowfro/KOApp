import React from 'react';

class Canvas extends React.Component {

  constructor(props){
    super(props);
    this.state = {imgURI:'', width:null, height:null}
    //this.handleWidthAndHeight = this.handleWidthAndHeight.bind(this);
  }

  componentDidMount() {

    const canvas = this.refs.canvas;
    const artwork = canvas.getContext("2d");
    const img = this.refs.image;
    let imageURI;
    var xhr = new XMLHttpRequest();

    artwork.fillText("Loading....",20,150);


    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log('response: '+ xhr.responseText);
      try{
      var json = JSON.parse(xhr.responseText);
      console.log('json: '+json.image);
      imageURI = json.image;
      console.log('image '+imageURI);
      this.setState({imgURI:imageURI});
    } catch(err){
      console.log('NOT JSON');
        artwork.clearRect(0,0,300,300);
        this.setState({imgURI:null});
      artwork.fillText('This is not a valid token/edition please try again', 20,150);
    }
    })
    // open the request with the verb and the url
    xhr.open('GET', this.props.imageURI)
    // send the request
    xhr.send()


  img.onload = () => {
      artwork.clearRect(0,0,300,300);
      //console.log("w: "+  img.width + "h: "+img.height)
      this.props.handleWidthAndHeight(img.width, img.height);
      this.setState({width:img.width, heigh:img.height});
      //console.log('w+h'+this.props.width+ ' ' + this.props.height);

      artwork.drawImage(img, 0,0, img.height>img.width? 300 * img.width / img.height : 300, img.width>img.height ? 300 * img.height/img.width : 300 );

    }
  }

render() {
  console.log('insideCanvas: '+this.props.imageURI);
    return(
      <div>
        <canvas ref="canvas" width={300} height={300} />
        <img ref="image" className="d-none" src={this.state.imgURI} alt="Known Origin Artwork"/>
      </div>
    )
  }
}

export default Canvas;
