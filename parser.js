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
        const variableTypes = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte', 'boolean', 'short'];
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
                            this.index++;
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final int
                            this.index++;
                            // Variable, or array
                            if(this.tokens[this.index].tokenName === '=')
                            { // public final int x =
                                this.index++;
                                // Variable declaration
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            { // public final int x[
                                this.index++;
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
                            this.index++;
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
                                    this.index++;
                                    // Method header
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // public static final int x =
                                    this.index++;
                                    // Variable declaration
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public static final int x[
                                    this.index++;
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
                            this.index++;
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
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final public static Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final public static int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final public static int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // final public static int =
                                // Array declaration
                            }
                            else
                            { // final public static int $
                                // error
                            }
                        }
                        else
                        { // final public static $
                            // error
                        }
                    }
                    else
                    { // final public
                        // Can be object declaration
                        // Can be variable declaration
                        // Can be array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final public Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final public int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final public int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // final public int =
                                // Array declaration
                            }
                            else
                            { // final public int $
                                // error
                            }
                        }
                        else
                        { // final public $
                            // error
                        }
                    }
                }
                else if(this.tokens[this.index].tokenName === 'static')
                {
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                    { // final static public
                        // Object declaration
                        // variable declaration
                        // array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final static public Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final static public int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final static public int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // final static public int =
                                // varaible declaration
                            }
                            else
                            { // final static public int $
                                // error
                            }
                        }
                        else
                        { // final static public $
                            // error
                        }
                    }
                    else
                    { // final static
                        // Object declaration
                        // variable declaration
                        // array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final static Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final static int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final static int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // final static int =
                                // varaible declaration
                            }
                            else
                            { // final static int $
                                // error
                            }
                        }
                        else
                        { // final static $
                            // error
                        }
                    }
                }
                else
                { // final
                    // Object declaration
                    // variable declaration
                    // array declaration
                    this.index++;
                    if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                    {   // final Object
                        // Object declaration
                    }
                    else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                    {   //final int
                        // Can be variable declaration
                        // Can be array declaration
                        this.index++;
                        if(this.tokens[this.index] === '[')
                        { // final int [
                            // Array decalaration
                        }
                        else if(this.tokens[this.index] === '=')
                        { // final int =
                            // varaible declaration
                        }
                        else
                        { // final int $
                            // error
                        }
                    }
                    else
                    { // final $
                        // error
                    }
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
                        // Object declaration
                        // variable declaration
                        // array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // static final public Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static final public int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static final public int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // static final public int =
                                // varaible declaration
                            }
                            else
                            { // static final public int $
                                // error
                            }
                        }
                        else
                        { // static final public $
                            // error
                        }
                    }
                    else
                    { // static final
                        // Object declaration
                        // variable declaration
                        // array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // static final Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static final int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static final int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // static final int =
                                // varaible declaration
                            }
                            else
                            { // static final int $
                                // error
                            }
                        }
                        else
                        { // static final $
                            // error
                        }
                    }
                }
                else if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                {
                    if(this.tokens[this.index].tokenName === 'final')
                    { // static public final
                        // Object declaration
                        // variable declaration
                        // array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // static public final Object
                            // Object declaration
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static public final int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static public final int [
                                // Array decalaration
                            }
                            else if(this.tokens[this.index] === '=')
                            { // static public final int =
                                // varaible declaration
                            }
                            else
                            { // static public final int $
                                // error
                            }
                        }
                        else
                        { // static public final $
                            // error
                        }
                    }
                    else
                    { // static public
                        // Can be method header
                        // Can be an array declaratoin
                        // Can be variable declaration
                        // Can be object declaration
                        this.index++;
                        if(this.tokens[this.index].tokenName === 'void')
                        { // static public void
                            // This is a method header
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // static public int
                            // Variable, method, or array
                            this.index++;
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static public int x    //if x is not declared previously
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                this.index++;
                                if(this.tokens[this.index].tokenName === '(')
                                { // static public int x(
                                    // Method header
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // static public int x =
                                    // Variable declaration
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static public int x[
                                    // Array declaration
                                }
                                else
                                {
                                    // Error I think
                                }
                            }
                            else
                            {// static public int x     //if x is already declared previously
                                //Error
                            }

                        }
                        else if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // static public object
                            // Object declaration
                        }
                        else
                        {
                            // An error of somekind I think
                        }
                    }
                }
                else
                { // static
                    // Can be method header
                        // Can be an array declaratoin
                        // Can be variable declaration
                        // Can be object declaration
                        this.index++;
                        if(this.tokens[this.index].tokenName === 'void')
                        { // static void
                            // This is a method header
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // static int
                            // Variable, method, or array
                            this.index++;
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static int x    //if x is not declared previously
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                this.index++;
                                if(this.tokens[this.index].tokenName === '(')
                                { // static int x(
                                    // Method header
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // static int x =
                                    // Variable declaration
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static int x[
                                    // Array declaration
                                }
                                else
                                {
                                    // Error I think
                                }
                            }
                            else
                            {// static int x     //if x is already declared previously
                                //Error
                            }

                        }
                        else if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // static object
                            // Object declaration
                        }
                        else
                        {
                            // An error of somekind I think
                        }
                }
            }
            // We know we are initializing something
        }
        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
        {
            // We know we are initializing a variable, array, or this is a method header
            this.index++;
            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
            { // int x    //if x is not declared previously
                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                this.index++;
                if(this.tokens[this.index].tokenName === '(')
                { // int x(
                    // Method header
                }
                else if(this.tokens[this.index].tokenName === '=')
                { // int x =
                    // Variable declaration
                }
                else if(this.tokens[this.index].tokenName === '[')
                { // int x[
                    // Array declaration
                }
                else
                {
                    // Error I think
                }
            }
            else
            {// int x     //if x is already declared previously
                //Error
            }
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