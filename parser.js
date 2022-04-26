class Parser
{
    /**
     * @constructor
     * @param {String} parserType
     * @param {Array} tokens
     * @param {Array} classes
     * 
     */
    constructor(parserType, tokens)
    {
        this.parserType = parserType;
        this.tokens = tokens;
        this.classes = classes;
        const identifiersDeclared = []; // This is an array to store all declared identifiers.
        let index = 0;
    }


    Parser(tokens)
    {
        
        while(this.index < this.tokens.length)
        {
            if( this.tokens[index].tokenType === "keyword" || this.identifiersDeclared.indexOf(this.tokens[index]) !== -1)
            {
                this.StatementFinder();
            } 
            index ++;
        }
    }

    /**
     * 
     * @returns {int} startIndex
     * @returns {int} endIndex 
     * @return {String} statementType
     */
    StatementFinder()
    {
        const modifiers = ['final', 'static', 'public', 'private', 'protected'];
        const variableTypes = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte', 'boolean'];
        if(modifiers.indexOf(this.tokens[this.index]) !== -1) 
        {
            if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
            {
                this.index++;
                if(this.tokens[this.index] === 'final')
                {
                    this.index++;
                    if(this.tokens[this.index] === 'static')
                    {
                        this.index++;
                    }
                    else
                    {
                        this.index++;
                    }
                }
                else if(this.tokens[this.index] === 'static')
                {
                    this.index++;
                    if(this.tokens[this.index] === 'final')
                    {
                        this.index++;
                    }
                    else
                    {
                        this.index++;
                    }
                }
                else
                {
                    this.index++;
                }
            }
            else if(this.tokens[this.index] === 'final')
            {
                this.index++;
                if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                {
                    if(this.tokens[this.index] === 'static')
                    {
                        this.index++;
                    }
                    else
                    {
                        this.index++;
                    }
                }
                else if(this.tokens[this.index] === 'static')
                {
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                    {
                        this.index++;
                    }
                    else
                    {
                        this.index++;
                    }
                }
                else
                {
                    this.index++;
                }
            }
            else if(this.tokens[this.index] === 'static')
            {
                this.index++;
                if(this.tokens[this.index] === 'final')
                {
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                    {
                        this.index++;
                    }
                    else
                    {
                        this.index++;
                    }
                }
                else if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                {
                    if(this.tokens[this.index] === 'final')
                    {
                        this.index++;
                    }
                    else
                    {
                        this.index++;
                    }
                }
                else
                {
                    this.index++;
                }
            }
            // We know we are initializing something
        }
        else if(variableTypes.indexOf(this.okens[this.index]) !== -1)
        {
            // We know we are initializing a variable
        }
        else if(this.tokens[this.index].tokenType === "identifier")
        {
            // We know we are doing something with an already declared identifier
        }
        else if(this.tokens[this.index].tokenName === "class")
        {
            // We know this is a class header
        }
        else if(this.tokens[this.index].tokenName === "import")
        {
            // We know this is an import statment
        }
        else if(this.tokens[this.index].tokenName === "for")
        {
            // We know this is a for loop
        }
        else if(this.tokens[this.index].tokenName === "if")
        {
            // We know this is an if statemenet
        }
        else if(this.tokens[this.index].tokenName === "return")
        {
            // We know this is a return statement
        }
        else if(this.tokens[this.index].tokenName === "swtitch")
        {
            // We know this is a switch statement
        }
        else if(this.tokens[this.index].tokenName === "case")
        {
            // We know this is a case statement
        }
        else if(this.tokens[this.index].tokenName === "break")
        {
            // WE know this is a break statement
        }
        else if(this.tokens[this.index].tokenName === "while")
        {
            // We know this is a while loop
        }
        else if(this.tokens[this.index].tokenName === "do")
        {
            // We know this is a do statement at the beggining of a do while loop
        }
        else if(this.tokens[this.index].tokenName === "try")
        {
            // We know that this is the begining of a try block
        }
    }
    







    /**
     * 
     * @param {Array} tokens 
     * @returns {int} indexOfError
     */
    VariableParser(tokens) 
    {
        const seperators = [' ', 'Φ', '(', ')', '{', '}', '[', ']', '.', ';'];
        const opperators = ['=' , '+' , '-' , '/' , '%' , '+=' , '-=' , '/=' , '*=' , '%=' , '==' , '<' , '>' , '<=' , '>=' , '++' , '--'];
        const keywords = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte' , 'for' , 'while' , 'if' , 'else' , 'class' , 'final' , 'protected' , 'public' , 'private' , 'static' , 'void' , 'return' , 'switch' , 'case' , 'this' , 'boolean' , 'main' , 'args', 'import', 'extends'];
        const variableTypes = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte', 'boolean']; // Subsection of keywords
        const numberVariables = ['int' , 'double' , 'float' , 'long' , 'byte'];
        //Need to figure out how to work on scoping later. Maybe an array of arrays that can append a new one on as a new scope is created?
        const variablesDeclared = []; // This is an array to store all declared variables.
        let index = 0;
        while(index < tokens.length)
        {
            let tokenHolder = tokens[index]; // A variable to hold the starting token of a statement.
            if(tokenHolder.tokenType === "keyword") // If the current token is a keyword
            {
                if(variableTypes.indexOf(tokenHolder.tokenName) !== -1) // If it starts with a variable type
                {
                    index++;
                    if(!(variablesDeclared.indexOf(tokens[index].tokenName) !== -1)) // If it's not a previously declared identifier
                    {
                        index++;
                        if(tokens[index].tokenName === '=')
                        {
                            index++;
                            if(numberVariables.indexOf(tokenHolder.tokenName) != -1) // If there is a number type of variable being declared
                            {
                                if(!isNaN(tokens[index].tokenName))
                                {
                                    index++;
                                    if(tokens[index].tokenName === ";")
                                    {

                                    }
                                    else
                                    {
                                        return index;
                                    }
                                }
                                else
                                {
                                    console.log("1");
                                    return index;
                                }
                            }
                            else if(tokenHolder.tokenName = 'String')
                            {
                                if(tokens[index].tokenName.charAt(0) === '"' && tokens[index].tokenName.charAt(tokens[index].tokenName.length-1) === '"')
                                {
                                    index++;
                                    if(tokens[index].tokenName === ";")
                                    {

                                    }
                                    else
                                    {
                                        return index;
                                    }
                                }
                                else
                                {
                                    console.log("2");
                                    return index;
                                }
                            }
                            else if(tokenHolder.tokenName === 'boolean')
                            {
                                if(tokens[index].tokenName === 'true' || tokes[index].tokenName === 'false')
                                {
                                    index++;
                                    if(tokens[index].tokenName === ";")
                                    {
                                        index++;
                                        if(tokens[index].tokenName === ";")
                                        {

                                        }
                                        else
                                        {
                                            return index;
                                        }
                                    }
                                    else
                                    {
                                        return index;
                                    }
                                }
                                else
                                {
                                    console.log("3");
                                    return index;
                                }
                            }
                        }
                        else
                        {
                            return index;
                        }
                    }
                    else
                    {
                        return index;
                    }
                }
                else
                {
                    return index;
                }
            }
            else if((tokenHolder.tokenType === 'identifier' && !(variablesDeclared.indexOf(tokens[index].tokenType) !== -1))) //If the statement starts with a previously declared identifier
            {
                index++;
                 if(tokens[index].tokenName === '=')
                {
                    index++;
                    if(numberVariables.indexOf(tokenHolder.tokenName) != -1) // If there is a number type of variable being declared
                    {
                        if(!isNaN(tokens[index].tokenName))
                        {
                            index++;
                            if(tokens[index].tokenName === ";")
                            {

                            }
                            else
                            {
                                return index;
                            }
                        }
                        else
                        {
                            console.log("4");
                            return index;
                        }
                    }
                    else if(tokenHolder.tokenName = 'String')
                    {
                        if(tokens[index].tokenName.charAt(0) === '"' && tokens[index].tokenName.charAt(tokens[index].tokenName.length-1) === '"')
                        {
                            index++;
                            if(tokens[index].tokenName === ";")
                            {

                            }
                            else
                            {
                                return index;
                            }  
                        }
                        else
                        {
                            console.log("5");
                            return index;
                        }
                    }
                    else if(tokenHolder.tokenName === 'boolean')
                    {
                        if(tokens[index].tokenName === 'true' || tokens[index].tokenName === 'false')
                        {
                            index++;
                            if(tokens[index].tokenName === ";")
                            {

                            }
                            else
                            {
                                return index;
                            }
                        }
                        else
                        {
                            console.log("6");
                            return index;
                        }
                    }
                    else
                    {
                        return index;
                    }
                }
                else
                {
                    return index;
                }
            }
            index++;
        }
        return -1;
    }
}