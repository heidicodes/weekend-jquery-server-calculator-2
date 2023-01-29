const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})
  
const myExpressions = [];


 function calculate(object) {
    let result = 0;
    const num1 = Number(object.num1);
    const num2 = Number(object.num2);
    const operator = object.operator;
    if (operator === '+') {
        result = num1 + num2
    } if (operator === '-') {
        result = num1 - num2
    } if (operator === '*') {
        result = num1 * num2
    } if (operator === '/') {
        result = num1 / num2
    }
     return result;
};
// making post request
app.post('/calculator', (req, res) => {
    console.log("Inside of POST request!", req.body);

    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const operator = req.body.operator;


    let calcToHappen = {
        num1,
        num2,
        operator
     }
    
    // setting calcToHappen of calculate to = new total of calcToHappen
    calcToHappen.total = calculate(calcToHappen);
    // pushing calcToHappen to myExpressions array 
    myExpressions.push(calcToHappen);   
    console.log('My expressions:', myExpressions);
    res.sendStatus(201);
}); 
app.get('/calculator', (req, res) => {
    console.log("Inside of GET request!", req.body);

    res.send(myExpressions);
});   
