import React, {useState} from 'react'

import './StylesCalculator.css'

function Calculator()
{
    const operators = ['+', '-', '*', '/']
    const [evalString, setEvalString] = useState('0')

    const buildCalculation = (value) => {
        // Disable adding two operators in a row
        const lastChar = evalString.slice(-1)
        const secondLastChar = evalString.charAt(evalString.length-2)

        // +- | +* | +/ <-- these should NOT be allowed, skip them
        if (operators.includes(lastChar) && operators.includes(value)) {
            return
        }

        // ... 0+ | 0- | 0/ | 0* <-- these should be allowed
        if (evalString === '0' && operators.includes(value))
        {
            setEvalString('0' + value)
        }
        else if (lastChar === '0' && operators.includes(secondLastChar) && !operators.includes(value)) {
            return
        }
        // ... evalString is '0', but value is not an operand -> replace the '0' with value
        else if (evalString === '0') {
            setEvalString(value)
        }
        // ... otherwise, just add value to evalString
        else {
            setEvalString(evalString + value)
        }        
    }

    const runCalculation = () => {
        const lastChar = evalString.slice(-1)

        // Only do the calculation, if the last character is not an operator
        if (!operators.includes(lastChar)) {
            const result = eval(evalString) + '' // Run eval and turn the result into a string
            setEvalString(result)
        }
    }

    const clearCalculation = () => {
        setEvalString('0')
    }

    return(
        <div className="calculator">
            <input type="text" class="calculator-display" value={evalString} disabled />
            <div class="calculator-grid">
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="operator" value="+">+</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="operator" value="-">-</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="operator" value="*">&times;</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="operator" value="/">&divide;</button>

                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="7">7</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="8">8</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="9">9</button>

                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="4">4</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="5">5</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="6">6</button>

                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="1">1</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="2">2</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="3">3</button>

                <button onClick={event => buildCalculation(event.target.value)} type="button" class="digit" value="0">0</button>
                <button onClick={event => buildCalculation(event.target.value)} type="button" class="decimal" value=".">.</button>
                <button onClick={() => clearCalculation()} type="button" class="clear" value="clear">C</button>

                <button onClick={() => runCalculation()} type="button" class="equal-sign" value="=">=</button>
            </div>
        </div>
    )
}

export default Calculator