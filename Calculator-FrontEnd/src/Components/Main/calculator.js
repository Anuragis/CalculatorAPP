import React,{ Component } from 'react';
import DisplayButton from '../Buttons/displayButton';
import DisplayScreen from '../Screens/displayScreen';
import axios from 'axios';

class Calculator extends Component{
    state={
        displayValue:'0',
        waitforOperand:false
      }

    handleClick= (value)=>{

        const {displayValue, waitforOperand}=this.state
        switch(value){
            case'=':{
                  if(!waitforOperand){
                    var temp=displayValue;
                    var req = temp.replace("/", "div");
                      axios.get('http://localhost:3001/eval/' + req)
                    .then(response =>{
                        console.log(response.data);
                        this.setState(
                            {
                                displayValue:response.data
                            }
                        ) 
                    });
                   
                  }  
                  break;
            }
            case '%':{
                this.setState(
                    {
                      displayValue:displayValue/100
                    }
                  )     
                  break;  
            }

            case 'cls':{
                this.setState(
                    {
                      displayValue:'0'
                    }
                  )
                  break;
            }

            case '.':{
                if(displayValue.indexOf('.')===-1){
                    this.setState({
                      displayValue: displayValue+'.'
                    })
                  }
                  break;
            }

            default:{
                if(value ==='/' || value ==='*' || value==='+' || value==='-' ){
                    if(!waitforOperand){
                        this.setState({
                          waitforOperand:true,
                          displayValue:displayValue+value
                        })
                    }
                }else{
                    if(waitforOperand){
         
                        this.setState({ 
                          displayValue:displayValue+String(value),
                          waitforOperand : false
                        })
                      
                      
                      }else{
                        this.setState(
                          {
                            displayValue: displayValue==='0'? String(value): displayValue+value
                          }
                        )
                      }
                }
            }
        }

    }
    render(){
        return (
            <div>
              <DisplayScreen display={this.state.displayValue} id="result"/>
             
               <div id="main">
              
                   <div id="first-rows">
                    <button class="del-bg" id="delete" onClick={()=>this.handleClick('cls')}>Del</button>
                    <DisplayButton value="%" class="btn-style operator opera-bg fall-back" id="%"  onClick={()=>this.handleClick('%')}/>
                    <DisplayButton value="+" class="btn-style opera-bg value align operator" id="+"  onClick={()=>this.handleClick('+') }/>
                  </div> 
                       
                  <div class="rows">
                    <DisplayButton value="7" class="btn-style num-bg num first-child" id="7" onClick={() => this.handleClick(7)}/>
                    <DisplayButton value="8" class="btn-style num-bg num" id="8"  onClick={()=>this.handleClick(8)}/>
                    <DisplayButton value="9" class="btn-style num-bg num" id="9" onClick={()=>this.handleClick(9) }/>
                    <DisplayButton value="-" class="btn-style opera-bg operator" id="-" onClick={()=>this.handleClick('-')}/>
                  </div>
                       
                  <div class="rows">
                       <DisplayButton value="4" class="btn-style num-bg num first-child" id="4" onClick={()=>this.handleClick(4)}/>
                        <DisplayButton value="5" class="btn-style num-bg num" id="5" onClick={()=>this.handleClick(5)}/>
                       <DisplayButton value="6" class="btn-style num-bg num" id="6" onClick={()=>this.handleClick(6)}/>
                       <DisplayButton value="x" class="btn-style opera-bg operator" id="*" onClick={()=>this.handleClick('*')}/>
                  </div>
                       
                  <div class="rows">
                       <DisplayButton value="1" class="btn-style num-bg num first-child" id="1" onClick={()=>this.handleClick(1)}/>
                       <DisplayButton value="2" class="btn-style num-bg num" id="2" onClick={()=>this.handleClick(2)}/>
                       <DisplayButton value="3" class="btn-style num-bg num" id="3" onClick={()=>this.handleClick(3)}/>
                       <DisplayButton value="/" class="btn-style opera-bg operator" id="/" onClick={()=>this.handleClick('/') }/>
                  </div>
                       
                    <div class="rows"> 
                       <button value="0" class="num-bg zero" id="delete" onClick={()=>this.handleClick(0)}>0</button>
                       <DisplayButton value="." class="btn-style num-bg period fall-back " id="." onClick={()=>this.handleClick('.')}/>
                       <button value="=" id="eqn-bg" class="eqn align" onClick={()=>this.handleClick('=')}>=</button>
                    </div>
                      
                   </div> 
                </div>   
                   );
        }
    }



export default Calculator;