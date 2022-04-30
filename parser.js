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
        const identifiers =[]; // This is also an array to store all declared identifiers but with token objects to store the identifier's type too.
        const knownObjects = []; // This is an array that contains all known object types
        let index = 0;
    }


    Parser(tokens)
    {
        const statements = [];
        while(this.index < this.tokens.length)
        {
            if( this.tokens[index].tokenType === "keyword" || this.identifiersDeclared.indexOf(this.tokens[index]) !== -1)
            {
                statements.push(this.StatementFinder());
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
        let startIndex = this.index;
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
                            this.index++;
                            // Object declaration
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public final static Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));

                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final static int
                            // Variable, or array
                            this.index++;
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // public final static int x    //if x is not declared previously
                                if(this.tokens[this.index].tokenName === '=')
                                { // public final static int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   public final static x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public final static int x[
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public final static int x[] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                { // public final static $
                                    // Error I think
                                }
                            }
                            else if(this.tokens[this.index] === '[')
                            {
                                // public final static int [
                                // Array declaration
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public final static int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            {
                                // public final static int $
                                // Error
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
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public final Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final int
                            this.index++;
                            // Variable, or array
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // public final int x    //if x is not declared previously
                                if(this.tokens[this.index].tokenName === '=')
                                { // public final int x =
                                    this.index++;
                                    // Variable declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   public final int x = 2;
                                    }
                                return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public final int x[
                                    this.index++;
                                    // Array declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public final int x[] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                { // public final int x $
                                    // Error I think
                                }
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            {
                                // public final int x [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public final static int x[] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            { // public final int $
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
                { // public static
                    // method header
                    // variable, object, or array declaration
                    this.index++;
                    if(this.tokens[this.index].tokenName === 'final')
                    { // public static final
                        // Variable, array, or object
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static final object
                            // Object declaration
                            this.index++;while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public static final Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                            
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static final int
                            // Variable, or array
                            this.index++;
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // public static final int x    //if x is not declared previously
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                this.index++;
                                if(this.tokens[this.index].tokenName === '=')
                                { // public static final int x =
                                    this.index++;
                                    // Variable declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // variable declaration ends with a semicolon:   public static final int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public static final int x[
                                    this.index++;
                                    // Array declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public final static int x[] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                { // public static final int x $
                                    // Error I think
                                }
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            {
                                // public static final int [
                                //Array Declaration
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public final static int x[] = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            {
                                //public static final int $
                                // Error
                            }
                        }
                        else
                        {   // public static final $
                            // Error I think
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
                            while(this.tokens[this.index].tokenName !== ')')
                            {
                               this.index++;
                                // Method headers end with a close parenthesis:   public static void exampleMethod()
                            }
                            return(Statement(startIndex,this.index, 'Method'));
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
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ')')
                                    {
                                        this.index++;
                                        // Method headers end with a close parenthesis:   public static int exampleMethod()
                                    }
                                    return(Statement(startIndex,this.index, 'Method'));
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // public static int x =
                                    // Variable declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Object declaration ends with a semicolon:   public final static Object x = new Object();
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public static int x[
                                    // Array declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public static int x[] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {
                                    // Error I think
                                }
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            {
                                // public static int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            {// public static int $
                                //Error
                            }

                        }
                        else if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static object
                            // Object declaration
                            this.index++;while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public static Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else
                        {
                            // public static $
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
                        // Method Header
                        this.index++;
                        while(this.tokens[this.index].tokenName !== ')')
                        {
                            this.index++;
                            // Method headers end with a close parenthesis:   public void exampleMethod()
                        }
                        return(Statement(startIndex,this.index, 'Method'));
                        
                    }
                    else if(this.tokens[this.index].tokenName === 'class' || this.tokens[this.index].tokenName === 'interface')
                    { // public class
                        // This is a class header
                        this.index++;
                        while(this.tokens[this.index + 1].tokenName !== '{')
                        {
                            this.index++;
                            // class headers end right before open braces:   public class HelloWorld
                        }
                        return(Statement(startIndex,this.index, 'Class'));
                    }
                    else if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                    { // public Object
                        // Object declaration
                        this.index++;
                        while(this.tokens[this.index].tokenName !== ';')
                        {
                            this.index++;
                            // Object declaration ends in semicolons:   public Object x = new Object();
                        }
                        return(Statement(startIndex,this.index, 'Object'));
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
                                // Method Header
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ')')
                                {
                                    this.index++;
                                    // Method headers end with a close parenthesis:   public int exampleMethod()
                                }
                                return(Statement(startIndex,this.index, 'Method'));
                            }
                            else if(this.tokens[this.index].tokenName === '=')
                            { // public int x =
                                // Variable declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Variable declaration ends with a semicolon:   public int x = 2;
                                }
                                return(Statement(startIndex,this.index, 'Variable'));
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            { // public int x[
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public int x [] = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            { // public int x $
                                // Error I think
                            }
                        }
                        else if(this.tokens[this.index].tokenName === '[')
                        {
                            // public int [
                            // Array declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                            }
                            return(Statement(startIndex,this.index, 'Array'));
                        }
                        else
                        { // public int $
                            // Error
                        }

                    }
                    else
                    { // public $
                        // An error of somekind I think
                    }
                }
            }
            else if(this.tokens[this.index].tokenName === 'final')
            { // final
                // Can be object declaration
                // Can be variable declaration
                // Can be array declaration
                this.index++;
                if(this.tokens[this.index].tokenName === 'public' || this.tokens[this.index].tokenName === 'private' || this.tokens[this.index].tokenName === 'protected')
                { // final public
                    if(this.tokens[this.index].tokenName === 'static')
                    {   // final public static
                        // Can be object declaration
                        // Can be variable declaration
                        // Can be array declaration
                        this.index++;
                        if(knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final public static Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   final public static Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final public static int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final public static int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   final public static int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // final public static int x    //if x is not declared previously
                                if(this.tokens[this.index] === '=')
                                { // final public static int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   final public static int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index] === '[')
                                {   // final public static int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   final public static int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                { // final public static int x $
                                    // error
                                }
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
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:  final public Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final public int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final public int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // final public int x    //if x is not declared previously
                                this.index++;
                                if(this.tokens[this.index].tokenName === '=')
                                { // final public int x =
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   final public int [] x = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // final public int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   final public int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                { // final public int x $
                                    // Error
                                }
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
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   final static public Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                            }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final static public int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final static public int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   final static public int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // final static public int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                if(this.tokens[this.index].tokenName === '=')
                                { // final static public int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   final static public int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // final static public int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:  final static public int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {
                                    //final static public int x $
                                    // error
                                }
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
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   final static Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //final static int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // final static int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   final static int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // final static int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                if(this.tokens[this.index].tokenName === '=')
                                { // final static int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   final static int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // final static int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:  final static int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {
                                    //final static int x $
                                    // error
                                }
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
                        this.index++;
                        while(this.tokens[this.index].tokenName !== ';')
                        {
                            this.index++;
                            // Object declaration ends in semicolons:   final Object x = new Object();
                        }
                        return(Statement(startIndex,this.index, 'Object'));
                    }
                    else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                    {   //final int
                        // Can be variable declaration
                        // Can be array declaration
                        this.index++;
                        if(this.tokens[this.index] === '[')
                        { // final int [
                            // Array declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Array declaration ends with a semicolon:   final int [] x = new int[10];
                            }
                            return(Statement(startIndex,this.index, 'Array'));
                        }
                        else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                        { // final int x    //if x is not declared previously
                            // varaible declaration or array declaration
                            if(this.tokens[this.index].tokenName === '=')
                            { // final int x =
                                // Variable declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Variable declaration ends with a semicolon:   final int x = 2;
                                }
                                return(Statement(startIndex,this.index, 'Variable'));
                            }
                            else if(this.tokens[this.index].tokenName === '[')
                            { // final int x [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:  final int x [] = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            {
                                //final int x $
                                // error
                            }
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
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   static final public Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static final public int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static final public int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   static final public int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static final public int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                if(this.tokens[this.index].tokenName === '=')
                                { // static final public int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   static final public int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static final public int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:  static final public int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {
                                    //static final public int x $
                                    // error
                                }
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
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   public Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static final int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static final int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   static final int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static final int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                if(this.tokens[this.index].tokenName === '=')
                                { // static final int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   static final int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static final int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:  static final int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {
                                    //static final int x $
                                    // error
                                }
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
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   static public final Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static public final int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static public final int [
                                // Array declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                                }
                                return(Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static public final int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                if(this.tokens[this.index].tokenName === '=')
                                { // static public final int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   static public final int x = 2;
                                    }
                                    return(Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static public final int x [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:  static public final int x [] = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {
                                    // static public final int x $
                                    // error
                                }
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
                            // Method Header
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ')')
                            {
                                this.index++;
                                // Method headers end with a close parenthesis:   static public void exampleMethod()
                            }
                            return(Statement(startIndex,this.index, 'Method'));
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
                                    // Method Header
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ')')
                                    {
                                        this.index++;
                                        // Method headers end with a close parenthesis:   static public void exampleMethod()
                                    }
                                    return(Statement(startIndex,this.index, 'Method'));
                                }
                                else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                                { // static public int x    //if x is not declared previously
                                    // varaible declaration or array declaration
                                    if(this.tokens[this.index].tokenName === '=')
                                    { // static public int x =
                                        // Variable declaration
                                        this.index++;
                                        while(this.tokens[this.index].tokenName !== ';')
                                        {
                                            this.index++;
                                            // Variable declaration ends with a semicolon:   static public int x = 2;
                                        }
                                        return(Statement(startIndex,this.index, 'Variable'));
                                    }
                                    else if(this.tokens[this.index].tokenName === '[')
                                    { // static public int x [
                                        // Array declaration
                                        this.index++;
                                        while(this.tokens[this.index].tokenName !== ';')
                                        {
                                            this.index++;
                                            // Array declaration ends with a semicolon:  static public int x [] = new int[10];
                                        }
                                        return(Statement(startIndex,this.index, 'Array'));
                                    }
                                    else
                                    {
                                        // static public int x $
                                        // error
                                    }
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static public int x[
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   static public int [] x = new int[10];
                                    }
                                    return(Statement(startIndex,this.index, 'Array'));
                                }
                                else
                                {  // static public int x $
                                    // Error I think
                                }
                            }
                            else
                            {// static public int $
                                //Error
                            }

                        }
                        else if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // static public object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   static public Object x = new Object();
                            }
                            return(Statement(startIndex,this.index, 'Object'));
                        }
                        else
                        { // static public $
                            // Error
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
                    // Method Header
                    this.index++;
                    while(this.tokens[this.index].tokenName !== ')')
                    {
                        this.index++;
                        // Method headers end with a close parenthesis:   static void exampleMethod()
                    }
                    return(Statement(startIndex,this.index, 'Method'));
                    
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
                            // Method Header
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ')')
                            {
                                this.index++;
                                // Method headers end with a close parenthesis:   static int exampleMethod()
                            }
                            return(Statement(startIndex,this.index, 'Method'));
                        }
                        else if(this.tokens[this.index].tokenName === '=')
                        { // static int x =
                            // Variable declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Variable declaration ends with a semicolon:   static int x = 2;
                            }
                            return(Statement(startIndex,this.index, 'Variable'));
                        }
                        else if(this.tokens[this.index].tokenName === '[')
                        { // static int x[
                            // Array declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Array declaration ends with a semicolon:   static int x [] = new int[10];
                            }
                            return(Statement(startIndex,this.index, 'Array'));
                        }
                        else
                        {
                            // Error I think
                        }
                    }
                    else if(this.tokens[this.index].tokenName === '[')
                    { // static int [
                        // Array declaration
                        this.index++;
                        while(this.tokens[this.index].tokenName !== ';')
                        {
                            this.index++;
                            // Array declaration ends with a semicolon:   static int [] x = new int[10];
                        }
                        return(Statement(startIndex,this.index, 'Array'));
                    }
                    else
                    {// static int $
                        //Error
                    }
                }
                else if(knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                { // static object
                    // Object declaration
                    this.index++;
                    while(this.tokens[this.index].tokenName !== ';')
                    {
                        this.index++;
                        // Object declaration ends in semicolons:   public Object x = new Object();
                    }
                    return(Statement(startIndex,this.index, 'Object'));
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
        { // int
            // We know we are initializing a variable, array, or this is a method header
            this.index++;
            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
            { // int x    //if x is not declared previously
                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                this.index++;
                if(this.tokens[this.index].tokenName === '(')
                { // int x(
                    // Method Header
                    this.index++;
                    while(this.tokens[this.index].tokenName !== ')')
                    {
                        this.index++;
                        // Method headers end with a close parenthesis:   int exampleMethod()
                    }
                    return(Statement(startIndex,this.index, 'Method'));
                    
                }
                else if(this.tokens[this.index].tokenName === '=')
                { // int x =
                    // Variable declaration
                    this.index++;
                    while(this.tokens[this.index].tokenName !== ';')
                    {
                        this.index++;
                        // Variable declaration ends with a semicolon:   int x = 2;
                    }
                    return(Statement(startIndex,this.index, 'Variable'));
                }
                else if(this.tokens[this.index].tokenName === '[')
                { // int x[
                    // Array declaration
                    this.index++;
                    while(this.tokens[this.index].tokenName !== ';')
                    {
                        this.index++;
                        // Array declaration ends with a semicolon:   int x [] = new int[10];
                    }
                    return(Statement(startIndex,this.index, 'Array'));
                }
                else
                { // int $
                    // Error
                }
            }
            else if(this.tokens[this.idex].tokenName === '[')
            { // int [
                // Array declaration
                this.index++;
                while(this.tokens[this.index].tokenName !== ';')
                {
                    this.index++;
                    // Array declaration ends with a semicolon:   int [] x = new int[10];
                }
                return(Statement(startIndex,this.index, 'Array'));
            }
            else
            {// int $
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
        else
        {
            // Error or not covered as of now
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