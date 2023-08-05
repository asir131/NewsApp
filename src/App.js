
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  
  Routes,
  Route,
  
} from "react-router-dom";


export default class App extends Component {

  state={
    progress:0
  }
  setProgress=(progress)=>{
        this.setState({progress: progress})
    }
   pageSize=15;
   c='jhon'
  render() {
    return (
      <div>
        <Router>
        <Navbar></Navbar>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
         <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>}></Route>
            <Route exact path="/about" element={<News setProgress={this.setProgress} key="aboutabout" pageSize={this.pageSize} country="in" category="about"/>}></Route>
            
            
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business"/>}>
            
            </Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}>
            
            </Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"/>}>
            
            </Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"/>}>
            
            </Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports"/>}>
            
            </Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"/>}>
            
            </Route>
          
         </Routes>

        </Router>
        
        

      </div>
    )
  }
}

