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
        const knownObjects = []; // This is an array that contains all known object types
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
        if(modifiers.indexOf(this.tokens[this.index].tokenName) !== -1) 
        {
            if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
            {
                // class header
                // method header
                // variable, object, or array declaration
                this.index++;
                if(this.tokens[this.index].tokenName === 'final')
                { // public final
                    // variable, array, or object declaration
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'static')
                    { // public final static
                        this.index++;
                        // Variable, array, or object declaration
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final static Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final static int
                            // Variable, or array
                            if(this.tokens[this.index].tokenName === '=')
                            { // public final static int x =
                                // Variable declaration
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            { // public final static int x[
                                // Array declaration
                            }
                            else
                            { // public final static $
                                // Error I think
                            }

                        }
                        else
                        { // public final $
                            // Error
                        }

                    }
                    else
                    { //public final
                        // Variable, array, or object
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final int
                            // Variable, or array
                            if(this.tokens[this.index].tokenName === '=')
                            { // public final int x =
                                // Variable declaration
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            { // public final int x[
                                // Array declaration
                            }
                            else
                            { // public final int x $
                                // Error I think
                            }
                        }
                        else
                        { // public final $
                            // Error
                        }

                    }
                }
                else if(this.tokens[this.index].tokenName === 'static')
                { 
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'final')
                    { // public static final
                        // Variable, array, or object
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static final object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static final int
                            // Variable, method, or array
                            this.index++;
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // public static final int x    //if x is not declared previously
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                this.index++;
                                if(this.tokens[this.index].tokenName === '(')
                                { // public static final int x(
                                    // Method header
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // public static final int x =
                                    // Variable declaration
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public static final int x[
                                    // Array declaration
                                }
                                else
                                { // public static final int x $
                                    // Error I think
                                }
                            }
                            else
                            {
                                // public static int x     //if x is already declared previously
                                //Error
                            }
                        }
                    }
                    else
                    { // public static
                        // Can be method header
                        // Can be an array declaratoin
                        // Can be variable declaration
                        // Can be object declaration
                        this.index++;
                        if(this.tokens[this.index].tokenName === 'void')
                        { // public static void
                            // This is a method header
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static int
                            // Variable, method, or array
                            this.index++;
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // public static int x    //if x is not declared previously
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                this.index++;
                                if(this.tokens[this.index].tokenName === '(')
                                { // public static int x(
                                    // Method header
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // public static int x =
                                    // Variable declaration
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public static int x[
                                    // Array declaration
                                }
                                else
                                {
                                    // Error I think
                                }
                            }
                            else
                            {// public static int x     //if x is already declared previously
                                //Error
                            }

                        }
                        else if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static object
                            // Object declaration
                        }
                        else
                        {
                            // An error of somekind I think
                        }
                    }
                }
                else
                {
                    // Can be method header
                    // Can be class header
                    // Can be an array declaratoin
                    // Can be object declaration
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'void')
                    { // public void
                        // This is a method header
                    }
                    else if(this.tokens[this.index].tokenName === 'class' || this.tokens[this.index].tokenName === 'interface')
                    { // public class
                        // This is a class header
                    }
                    else if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                    { // public Object
                        // Object declaration
                    }
                    else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                    {
                        // Variable, method, or array
                        this.index++;
                        if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                        {
                            this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                            this.index++;
                            if(this.tokens[this.index].tokenName === '(')
                            { // public int x(
                                // Method header
                            }
                            else if(this.tokens[this.index].tokenName === '=')
                            { // public int x =
                                // Variable declaration
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            { // public int x[
                                // Array declaration
                            }
                            else
                            { // public int x $
                                // Error I think
                            }
                        }
                        else
                        { // public int x   // if x is already declared
                            // Error
                        }

                    }
                    else
                    { // public int $
                        // An error of somekind I think
                    }
                }
            }
            else if(this.tokens[this.index].tokenName === 'final')
            {
                // Can be object declaration
                // Can be variable declaration
                // Can be array declaration
                this.index++;
                if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                {
                    if(this.tokens[this.index].tokenName === 'static')
                    {   // final public static
                        // Can be object declaration
                        // Can be variable declaration
                        // Can be array declaration
                        this.index++;
                    }
                    else
                    { // final public
                        this.index++;
                    }
                }
                else if(this.tokens[this.index].tokenName === 'static')
                {
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                    { // final static public
                        this.index++;
                    }
                    else
                    { // final static
                        this.index++;
                    }
                }
                else
                { // final
                    this.index++;
                }
            }
            else if(this.tokens[this.index].tokenName === 'static')
            {
                this.index++;
                if(this.tokens[this.index].tokenName === 'final')
                {
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                    { // static final public
                        this.index++;
                    }
                    else
                    { // static final
                        this.index++;
                    }
                }
                else if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                {
                    if(this.tokens[this.index].tokenName === 'final')
                    { // static public final
                        this.index++;
                    }
                    else
                    { // static public
                        // Can be method header
                        this.index++;
                        if(this.tokens[this.index].tokenName === 'void')
                        { // static public void
                            // This is a method header
                        }
                    }
                }
                else
                { // static
                    // Can be method header
                    // Can be variable declaration
                    // Can be array declaration
                    // Can be object declaration
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'void')
                    { // static void
                        // This is a method header
                    }
                }
            }
            // We know we are initializing something
        }
        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
        {
            // We know we are initializing a variable, array, or this is a method header
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