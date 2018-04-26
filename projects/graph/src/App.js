import React, { Component } from 'react';
import { Graph } from './graph';
import './App.css';

// !!! IMPLEMENT ME
const canvasWidth = 750;
const canvasHeight = 600;

/**
 * GraphView
 */
class GraphView extends Component {
  /**
   * On mount
   */
  componentDidMount() {
    this.updateCanvas();
  }

  /**
   * On state update
   */
  componentDidUpdate() {
    this.updateCanvas();
  }

  /**
   * Render the canvas
   */

  drawSin(start, c, color) {
    const ctx = c;

    ctx.beginPath();
    ctx.moveTo(0, start);

    for (let x = 0; x <= 720; x++) {
      let y = start - Math.sin(x*Math.PI/180)*120;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;
    ctx.stroke();
  }

  drawCos(start, c, color) {
    const ctx = c;

    ctx.beginPath();
    ctx.moveTo(0, start);

    for (let x = 0; x <=720; x++) {
      let y = start - Math.cos(x*Math.PI/180)*120;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;
    ctx.stroke();
  }

  updateCanvas() {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    
    // Clear it
    ctx.fillStyle = '#1e90ff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // !!! IMPLEMENT ME
    // compute connected components
    // draw edges
    // draw verts
    // draw vert values (labels)

    const vertexes = this.props.graph.vertexes;

    for (let vertex of vertexes) {
      for (let edge of vertex.edges) {
        ctx.beginPath();
        ctx.strokeStyle = vertex.color; 
        ctx.moveTo(vertex.pos.x, vertex.pos.y);
        ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y);
        ctx.stroke();
      }
    }

    for (let vertex of vertexes) {
      ctx.beginPath();
      ctx.arc(vertex.pos.x, vertex.pos.y, 12, 0, 2*Math.PI);
      ctx.fillStyle = vertex.color;
      ctx.strokeStyle = vertex.color;
      ctx.fill();
      ctx.stroke();

      ctx.font = "10px Arial";
      ctx.textAllign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black";
      ctx.fillText(vertex.value, vertex.pos.x, vertex.pos.y);

      // ctx.moveTo(vertexes[i].edges[0]);

    }

    
    // for (let i = -90; i <= 1040; i +=3) {
    //   let h = 240;
    //   let s = Math.floor((Math.random() * 51) + 50);
    //   let l = Math.floor((Math.random() * 51) + 50);
    //   let color = 'hsl(' + h + ',' + s + '%,' + l + '%)';
    //   this.drawSin(i,ctx, color);
    // }

    // for (let i = -90; i <= 1040; i +=3) {
    //   let h = 270;
    //   let s = Math.floor((Math.random() * 51) + 50);
    //   let l = Math.floor((Math.random() * 51) + 50);
    //   let color = 'hsl(' + h + ',' + s + '%,' + l + '%)';
    //   this.drawCos(i, ctx, color);
    // }
  }
  
  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
  }
}


/**
 * App
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: new Graph()
    };

    // !!! IMPLEMENT ME
    // use the graph randomize() method
    this.state.graph.randomize(5, 4, 150, 0.6);
    this.state.graph.getConnectedComponents();
    // this.state.graph.createTestData();
    // this.state.graph.dump();
  }

  render() {
    return (
      <div className="App">
        <GraphView graph={this.state.graph}></GraphView>
      </div>
    );
  }
}

export default App;
