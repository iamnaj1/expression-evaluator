import React, { Component } from 'react';
import _ from 'lodash'
import './react-dev.css'
//material ui imports
import { createMuiTheme, ThemeProvider,
  fade, 
  makeStyles,  } from '@material-ui/core/styles';
import { Button, Input  } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import 'typeface-roboto';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 
import InputLabel from '@material-ui/core/InputLabel'; 


const useStyles = makeStyles(theme => ({
    root: { 
      textAlign: 'center'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    } 
  }));

const theme = createMuiTheme({
palette: {
    primary: { 
    main: "#1bd6a2",
    contrastText: "white" 
    }
},
typography: {
    button: {
    fontSize: 20
    },
h1: {
    fontWeight: 100,
}
}
});
  
const inputStylesAddNumber = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        margin: '0 10px',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
        backgroundColor: '#fff',
        },
        '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
        },
    }, 
    focused: {},
}));

function AddNumberTextField(props) {
    const classes = inputStylesAddNumber();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
   

class ReactDev extends Component {
    constructor() {
        super();
    
        this.input1 = React.createRef();
        this.input2 = React.createRef();
        this.state = {
            operand1: 0,
            operand2: 0,
            operator: '1',
            operatorLabel: 'Add',
            result: 0,
            enableScreen2: false,
            resultScreen: false,
        };
        this.handleResult1 = this.handleResult1.bind(this);
        this.handleResult2 = this.handleResult2.bind(this);
    }  
    
    inputValue1 = (e) => {
        console.log("value: 1",e, e.target.value)
        this.setState({
            operand1: e.target.value
        });
      }
    inputValue2 = (e) => {
        this.setState({
            operand2: e.target.value
        });
    }
    handleResult1 () {
        console.log("input1: ", this.state.operand1) 
        this.setState({
            enableScreen2 : true
        })
    }
    handleResult2 () { 
        console.log("Operands: ", this.state.operand1 +","+ this.state.operand2)
        let sum = Number(this.state.operand1) + Number(this.state.operand2);
        this.setState({
            resultScreen : true,
            result: sum
        })
    }
    changeOperator(){
        this.setState({
            operator : '+'
        })
    }
    operatorChange = event => { 
        console.log("operator: ", event.target.value)  
        this.setState({
            operator: event.target.value
        });
        this.setState({  
            operatorLabel:  event.target.value == '1'? 'Add' :
            event.target.value == '2'? 'Subtract' :
            event.target.value == '3'? 'Multiply' :
            event.target.value == '4'? 'Divide' :
            null
        })  
    }; 
    operate(){
        this.setState({ 
            result: this.state.operator == '1'? Number(this.state.operand1) + Number(this.state.operand2) :
            this.state.operator == '2'? Number(this.state.operand1) - Number(this.state.operand2) :
            this.state.operator == '3'? Number(this.state.operand1) * Number(this.state.operand2) :
            this.state.operator == '4'? Number(this.state.operand1) / Number(this.state.operand2) :
            null}) 
    }
    renderSwitch() {
        console.log("switch: ", this.state.operator) 
        switch(this.state.operator) {
            case '1': 
            return '+';
            break;
            case '2': 
            return '-';
            break;
            case '3': 
            return '*';
            break;
            case '4': 
            return '/';
            break;
        }
    }
    render() {
        const { operand1, operand2, enableScreen2, resultScreen, operator, result } = this.state; 
        return (
            <div className="react-dev-assignment">
                <Container fixed className='react-dev-container'>
                <ThemeProvider theme={theme}>
                    <Typography variant="h1" color="primary">
                    Expression Evaluator
                    </Typography> 
                    {
                        resultScreen? 
                            <div>
                            <Paper class="paper-wrapper" style={{ display: 'flex', justifyContent: 'center'}}>
                                <div class="operands-wrapper">
                                    <Typography variant="h2" component="h2" component="div" style={{ backgroundColor: '#cfe8fc', width: '100px', margin:'0 5px'}}>
                                        {operand1}
                                    </Typography>
                                    <Typography variant="h2" component="h2" component="div" style={{ backgroundColor: '#cfe8fc', width: '100px', margin:'0 5px'}}>
                                        {operand2}
                                    </Typography>
                                    <Typography variant="h2" component="h2" component="div" style={{ backgroundColor: '#cfe8fc', width: '100px', margin:'0 5px'}}>
                                        {this.renderSwitch()}
                                    </Typography>  
                                </div>
                                <h1>=</h1>
                            <div className="result-wrapper">
                                <Typography variant="h2" component="h2" component="div" style={{ backgroundColor: '#cfe8fc', width: '100px', margin:'0 5px'}}>
                                    {result}
                                </Typography>
                            </div>
                            <div className="operators-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                <div className="operator-container"> 
                                    <FormControl 
                                        className="select-input"
                                        style={{margin:'0 50px'}}>
                                        <InputLabel htmlFor="operator-label">Operator</InputLabel>
                                        <Select
                                            style={{fontSize:'20px'}}
                                            value = {operator}
                                            native 
                                            onChange={this.operatorChange} 
                                            >
                                            <option value={1}>+</option>
                                            <option value={2}>-</option>
                                            <option value={3}>*</option> 
                                            <option value={4}>/</option> 
                                        </Select>
                                    </FormControl>
                                    
                                    <TextField id="outlined-basic" variant="outlined" value={operator} disabled /> 
                                </div>
                                <div className="operation-btn">
                                    <Button variant="contained" color="primary" className="add-btn" onClick={this.operate.bind(this)}> 
                                        {this.state.operatorLabel} Operation
                                    </Button>
                                </div>
                            </div>
                            </Paper>
                        </div>
                         
                        :
                        (!enableScreen2? 
                            <div class="add-number-screen"> 
                                <AddNumberTextField
                                    onChange={this.inputValue1}
                                    value={operand1}
                                    label="Please enter a number"
                                    className="operand-input-1" 
                                    variant="filled"
                                    id="OperandInput1"
                                />
                                
                                <Button variant="contained" color="primary" className="add-btn" onClick={this.handleResult1}> 
                                    Add number
                                </Button>
                            </div>:
                            <div class="add-number-screen">  
                                <AddNumberTextField
                                    onChange={this.inputValue2}
                                    value={operand2}
                                    label="Please enter 2nd number"
                                    className="operand-input-2" 
                                    variant="filled"
                                    id="OperandInput2"
                                />
                                
                                <Button variant="contained" color="primary" className="add-btn" onClick={this.handleResult2}> 
                                    Add number
                                </Button>
                            </div>
                        )
                    } 
                </ThemeProvider>
                </Container>
            </div>
        )
    }
}

  
export default ReactDev;