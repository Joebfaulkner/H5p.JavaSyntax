class Parser
{
    /**
     * @constructor
     * @param {Array} tokens
     * @param {Array} classes
     * 
     */
    constructor(tokens, classes)
    {
        this.tokens = tokens;
        this.classes = classes;
        this.identifiersDeclared = []; // This is an array to store all declared identifiers.
        this.identifiers =[]; // This is also an array to store all declared identifiers but with token objects to store the identifier's type too.
        this.knownObjects = []; // This is an array that contains all known object types
        for(let x = 0; x < classes.length; x++)
        {
            knownObjects.push(classes[x].className);
        }
        this.index = 0;
    }


    /**
     * @returns {boolean} works
     */
    parse()
    {
        const statements = [];
        while(this.index < this.tokens.length)
        {
            if( this.tokens[this.index].tokenType === "keyword" || this.identifiersDeclared.indexOf(this.tokens[this.index]) !== -1)
            {
                statements.push(this.StatementFinder());
            } 
            this.index ++;
        }
        console.log(statements);
        for(let x = 0; x < statements.length; x++)
        {
            if(statements[x].statmentType === 'Variable')
            {
                if(this.VariableParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statmentType === 'Array')
            {
                if(this.ArrayParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statmentType === 'Class')
            {
                if(this.ClassParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Object')
            {
                if(this.ObjectParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statmentType === 'Method')
            {
                if(this.MethodParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Import')
            {
                if(this.ImportParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statmentType === 'Assignment')
            {
                if(this.AssignmentParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'MethodCall')
            {
                if(this.MethodCallParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'For')
            {
                if(this.ForParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'If')
            {
                if(this.IfParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Switch')
            {
                if(this.SwitchParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Case')
            {
                if(this.CaseParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Break')
            {
                if(this.BreakParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'While')
            {
                if(this.WhileParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Do')
            {
                if(this.DoParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Try')
            {
                if(this.TryParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else if(statements[x].statementType === 'Catch')
            {
                if(this.CatchParser(statements[x]) !== -1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else 
            {
                // Error
            }
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final static Object
                            this.index++;
                            // Object declaration
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public final static Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));

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
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public final static int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public final Object
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public final Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                                        if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                        {
                                            this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                        }
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public final static int x[] = new int[10];
                                    }
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static final object
                            // Object declaration
                            this.index++;while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public static final Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
                            
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
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public final static int x[] = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
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
                            return(new Statement(startIndex,this.index, 'Method'));
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
                                    return(new Statement(startIndex,this.index, 'Method'));
                                }
                                else if(this.tokens[this.index].tokenName === '=')
                                { // public static int x =
                                    // Variable declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Object declaration ends with a semicolon:   public final static Object x = new Object();
                                    }
                                    return(new Statement(startIndex,this.index, 'Variable'));
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // public static int x[
                                    // Array declaration
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Array declaration ends with a semicolon:   public static int x[] = new int[10];
                                    }
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
                            }
                            else
                            {// public static int $
                                //Error
                            }

                        }
                        else if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // public static object
                            // Object declaration
                            this.index++;while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends with a semicolon:   public static Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                        return(new Statement(startIndex,this.index, 'Method'));
                        
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
                        return(new Statement(startIndex,this.index, 'Class'));
                    }
                    else if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                    { // public Object
                        // Object declaration
                        this.index++;
                        while(this.tokens[this.index].tokenName !== ';')
                        {
                            this.index++;
                            // Object declaration ends in semicolons:   public Object x = new Object();
                        }
                        return(new Statement(startIndex,this.index, 'Object'));
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
                                return(new Statement(startIndex,this.index, 'Method'));
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
                                return(new Statement(startIndex,this.index, 'Variable'));
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
                                return(new Statement(startIndex,this.index, 'Array'));
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
                                if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                {
                                    this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                }
                                this.index++;
                                // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                            }
                            return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final public static Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   final public static Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   final public static int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
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
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final public Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:  final public Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final static public Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   final static public Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   final static public int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // final static public int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                if(this.tokens[this.index].tokenName === '=')
                                { // final static public int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   final static public int x = 2;
                                    }
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // final static Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   final static Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   final static int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // final static int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                if(this.tokens[this.index].tokenName === '=')
                                { // final static int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   final static int x = 2;
                                    }
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                    if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                    {   // final Object
                        // Object declaration
                        this.index++;
                        while(this.tokens[this.index].tokenName !== ';')
                        {
                            this.index++;
                            // Object declaration ends in semicolons:   final Object x = new Object();
                        }
                        return(new Statement(startIndex,this.index, 'Object'));
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
                                if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                {   
                                    this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                }
                                this.index++;
                                // Array declaration ends with a semicolon:   final int [] x = new int[10];
                            }
                            return(new Statement(startIndex,this.index, 'Array'));
                        }
                        else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                        { // final int x    //if x is not declared previously
                            // varaible declaration or array declaration
                            this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                            if(this.tokens[this.index].tokenName === '=')
                            { // final int x =
                                // Variable declaration
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Variable declaration ends with a semicolon:   final int x = 2;
                                }
                                return(new Statement(startIndex,this.index, 'Variable'));
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
                                return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // static final public Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   static final public Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   static final public int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static final public int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                if(this.tokens[this.index].tokenName === '=')
                                { // static final public int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   static final public int x = 2;
                                    }
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // static final Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   public Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
                        }
                        else if(variableTypes.indexOf(this.tokens[this.index]) !== -1)
                        {   //static final int
                            // Can be variable declaration
                            // Can be array declaration
                            this.index++;
                            if(this.tokens[this.index] === '[')
                            { // static final int [
                                // Array declaration
                                if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                {
                                    this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                }
                                this.index++;
                                while(this.tokens[this.index].tokenName !== ';')
                                {
                                    this.index++;
                                    // Array declaration ends with a semicolon:   static final int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static final int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                if(this.tokens[this.index].tokenName === '=')
                                { // static final int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   static final int x = 2;
                                    }
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        if(this.knownObjects.indexOf(this.tokens[this.index].tokenName))
                        {   // static public final Object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   static public final Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                    {
                                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    }
                                    this.index++;
                                    // Array declaration ends with a semicolon:   public static int [] x = new int[10];
                                }
                                return(new Statement(startIndex,this.index, 'Array'));
                            }
                            else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                            { // static public final int x    //if x is not declared previously
                                // varaible declaration or array declaration
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                if(this.tokens[this.index].tokenName === '=')
                                { // static public final int x =
                                    // Variable declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        this.index++;
                                        // Variable declaration ends with a semicolon:   static public final int x = 2;
                                    }
                                    return(new Statement(startIndex,this.index, 'Variable'));
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
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                            return(new Statement(startIndex,this.index, 'Method'));
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
                                    return(new Statement(startIndex,this.index, 'Method'));
                                }
                                else if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) === -1)
                                { // static public int x    //if x is not declared previously
                                    // varaible declaration or array declaration
                                    this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                    if(this.tokens[this.index].tokenName === '=')
                                    { // static public int x =
                                        // Variable declaration
                                        this.index++;
                                        while(this.tokens[this.index].tokenName !== ';')
                                        {
                                            this.index++;
                                            // Variable declaration ends with a semicolon:   static public int x = 2;
                                        }
                                        return(new Statement(startIndex,this.index, 'Variable'));
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
                                        return(new Statement(startIndex,this.index, 'Array'));
                                    }
                                    else
                                    {
                                        // static public int x $
                                        // error
                                    }
                                }
                                else if(this.tokens[this.index].tokenName === '[')
                                { // static public int [
                                    // Array declaration
                                    this.index++;
                                    while(this.tokens[this.index].tokenName !== ';')
                                    {
                                        if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                                        {
                                            this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                                        }
                                        this.index++;
                                        // Array declaration ends with a semicolon:   static public int [] x = new int[10];
                                    }
                                    return(new Statement(startIndex,this.index, 'Array'));
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
                        else if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                        { // static public object
                            // Object declaration
                            this.index++;
                            while(this.tokens[this.index].tokenName !== ';')
                            {
                                this.index++;
                                // Object declaration ends in semicolons:   static public Object x = new Object();
                            }
                            return(new Statement(startIndex,this.index, 'Object'));
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
                    return(new Statement(startIndex,this.index, 'Method'));
                    
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
                            return(new Statement(startIndex,this.index, 'Method'));
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
                            return(new Statement(startIndex,this.index, 'Variable'));
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
                            return(new Statement(startIndex,this.index, 'Array'));
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
                            if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                            {
                                this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                            }
                            this.index++;
                            // Array declaration ends with a semicolon:   static int [] x = new int[10];
                        }
                        return(new Statement(startIndex,this.index, 'Array'));
                    }
                    else
                    {// static int $
                        //Error
                    }
                }
                else if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
                { // static object
                    // Object declaration
                    this.index++;
                    while(this.tokens[this.index].tokenName !== ';')
                    {
                        this.index++;
                        // Object declaration ends in semicolons:   public Object x = new Object();
                    }
                    return(new Statement(startIndex,this.index, 'Object'));
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
                    return(new Statement(startIndex,this.index, 'Method'));
                    
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
                    return(new Statement(startIndex,this.index, 'Variable'));
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
                    return(new Statement(startIndex,this.index, 'Array'));
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
                    if(this.identifiersDeclared.indexOf(this.tokens[this.index].tokenName) !== -1)
                    {
                        this.identifiersDeclared.push(this.tokens[this.index].tokenName);
                    }
                    // Array declaration ends with a semicolon:   int [] x = new int[10];
                }
                return(new Statement(startIndex,this.index, 'Array'));
            }
            else
            {// int $
                //Error
            }
        }
        else if(this.tokens[this.index].tokenType === "identifier")
        {
            // We know we are doing something with an already declared identifier
            // Can be an assignment
            // Can a method call
            this.index++;
            let flag = 'unKnown';
            while(this.tokens[this.index].tokenName !== ';')
            {
                if(this.tokens[this.index].tokenName === '.')
                {
                    flag = 'MethodCall'
                }
                else if(this.tokens[this.index].tokenName === '=')
                {
                    flag = 'Assignment'
                }
                this.index++;
            }
            return(new Statement(startIndex, this.index, flag));
        }
        else if(this.tokens[this.index].tokenName === "class" || this.tokens[this.index] === "interface")
        {
            // This is a class header
            this.index++;
            while(this.tokens[this.index + 1].tokenName !== '{')
            {
                this.index++;
                // class headers end right before open braces:   class HelloWorld
            }
            return(new Statement(startIndex,this.index, 'Class'));
        }
        else if(this.tokens[this.index].tokenName === "import")
        {
            // We know this is an import statment
            this.index ++;
            while(this.tokens[this.index].tokenName !== ';')
            {
                this.index++;
                // import statements end with a semicolon:      import java.util.Scanner;
            }
            return(new Statement(startIndex, this.index, 'Import'));
        }
        else if(this.tokens[this.index].tokenName === "for")
        {
            // We know this is a for loop
            // This is a class header
            this.index++;
            while(this.tokens[this.index + 1].tokenName !== '{')
            {
                this.index++;
                // for loops end right before open braces:   for(int x = 0; x < 10; x++)
            }
            return(new Statement(startIndex,this.index, 'For'));
        }
        else if(this.tokens[this.index].tokenName === "if")
        {
            // We know this is an if statemenet
            this.index++;
            let parenthNum = 0; // parenthNum is being used to determine when the parenthesis after if is closed
            if(this.tokens[this.index].tokenName === '(')
            {
                parenthNum++;
            }
            else
            {
                // Error
            }
            this.index ++;
            while(parenthNum !== 0)
            {
                if(this.tokens[this.index].tokenName === '(')
                {
                    parenthNum++;
                }
                else if(this.tokens[this.index].tokenName === ')')
                {
                    parenthNum--;
                }
                this.index++;
            }
            // if statements end when their first parenthesis closes:       if(5 < (int)(3*2.2))
            return(new Statement(startIndex, this.index, 'If'));
        }
        else if(this.tokens[this.index].tokenName === "return")
        {
            // We know this is a return statement
            this.index++;
            while(this.tokens[this.index].tokenName !== ';')
            {
                this.index++;
                // return statements end with a semicolon:   return 2;
            }
            return(new Statement(startIndex,this.index, 'Return'));

        }
        else if(this.tokens[this.index].tokenName === "switch")
        {
            // We know this is a switch statement
            this.index++;
            while(this.tokens[this.index + 1].tokenName !== '{')
            {
                this.index++;
                // switch statments end right before open braces:   switch(5)
            }
            return(new Statement(startIndex,this.index, 'Switch'));
        }
        else if(this.tokens[this.index].tokenName === "case")
        {
            // We know this is a case statement
            this.index++;
            while(this.tokens[this.index].tokenName !== ':')
            {
                this.index++;
                // case statements end with :       case 2:
            }
            return(new Statement(startIndex,this.index, 'Case'));

        }
        else if(this.tokens[this.index].tokenName === "break")
        {
            // We know this is a break statement
            this.index++;
            while(this.tokens[this.index].tokenName !== ';')
            {
                this.index++;
                // Break statements end with a semicolon:   break;
            }
            return(new Statement(startIndex,this.index, 'Break'));
        }
        else if(this.tokens[this.index].tokenName === "while")
        {
            // We know this is a while loop
            this.index++;
            let parenthNum = 0; // parenthNum is being used to determine when the parenthesis after while is closed
            if(this.tokens[this.index].tokenName === '(')
            {
                parenthNum++;
            }
            else
            {
                // Error
            }
            this.index ++;
            while(parenthNum !== 0)
            {
                if(this.tokens[this.index].tokenName === '(')
                {
                    parenthNum++;
                }
                else if(this.tokens[this.index].tokenName === ')')
                {
                    parenthNum--;
                }
                this.index++;
            }
            // while statements end when their first parenthesis closes:       while(x < (int)(2*3.2))
            return(new Statement(startIndex, this.index, 'While'));

        }
        else if(this.tokens[this.index].tokenName === "do")
        {
            // We know this is a do statement at the beggining of a do while loop
            // do statements are just do
            return(new Statement(startIndex, this.index, 'Do'));
        }
        else if(this.tokens[this.index].tokenName === "try")
        {
            // We know that this is the begining of a try block
            this.index++;
            while(this.tokens[this.index + 1].tokenName !== '{')
            {
                this.index++;
                // try blocks end right before open braces:   try (Printable writer = new PrintWriter(fileName))
            }
            return(new Statement(startIndex,this.index, 'Try'));
        }
        else if(this.tokens[this.index].tokenName === "catch")
        {
            // We know that this is the begining of a catch block
            this.index++;
            while(this.tokens[this.index + 1].tokenName !== '{')
            {
                this.index++;
                // catch blocks end right before open braces:   catch(Exception e)
            }
            return(new Statement(startIndex,this.index, 'Catch'));
        }
        else if(this.knownObjects.indexOf(this.tokens[this.index].tokenName) !== -1)
        {
            // We know that this is an object declaration
            this.index++;
            while(this.tokens[this.index].tokenName !== ';')
            {
                this.index++;
                // Object declaration ends in semicolons:   Object x = new Object();
            }
            return(new Statement(startIndex,this.index, 'Object'));
        }
        else
        {
            // Error or not covered as of now
        }
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    ArrayParser(statement)
    {
        const modifiers = ['final', 'static', 'public', 'private', 'protected'];
        const variableTypes = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte', 'boolean', 'short'];
        const access = ['public', 'private', 'protected'];
        let i = statment.startIndex;
        while(i < statment.endIndex)
        {
            if(modifiers.indexOf(this.tokens[i].tokenName) !== -1)
            {
                if(access.indexOf(this.tokens[i].tokenName) !== -1)
                { // public
                    i++;
                    if(this.tokens[i].tokenName === 'static')
                    { // public static
                        i++;
                        if(this.tokens[i].tokenName === 'final')
                        { // public static final
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                        else
                        { // public static
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                    }
                    else if(this.tokens[i].tokenName === 'final')
                    { // public final
                        i++;
                        if(this.tokens[i].tokenName === 'static')
                        { // public final static
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                        else
                        { // public final
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                    }
                    else
                    { // public
                        i++;
                        return(ArrayParserSpaceSaver(statement, i));
                    }
                }
                else if(this.tokens[i].tokenName === 'final')
                { // final
                    i++;
                    if(this.tokens[i].tokenName === 'static')
                    { // final static
                        i++;
                        if(access.indexOf(this.tokens[i].tokenName) !== -1)
                        { // final static public
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                        else
                        { // final static
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                    }
                    else if(access.indexOf(this.tokens[i].tokenName) !== -1)
                    { // final public
                        i++;
                        if(this.tokens[i].tokenName === 'static')
                        { // final public static
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                        else
                        { // final public
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                    }
                    else
                    { // final
                        i++;
                        return(ArrayParserSpaceSaver(statement, i));
                    }
                }
                else if(this.tokens[i].tokenName === 'static')
                { // static
                    i++;
                    if(this.tokens[i].tokenName === 'final')
                    { // static final
                        i++;
                        if(access.indexOf(this.tokens[i].tokenName) !== -1)
                        { // static final public
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                        else
                        { // static final
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                    }
                    else if(access.indexOf(this.tokens[i].tokenName) !== -1)
                    { // static public
                        i++;
                        if(this.tokens[i].tokenName === 'final')
                        { // static public final
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                        else
                        { // static public
                            i++;
                            return(ArrayParserSpaceSaver(statement, i));
                        }
                    }
                    else
                    { // static
                        i++;
                        return(ArrayParserSpaceSaver(statement, i));
                    }
                }
                else if(this.knownObjects.indexOf(this.tokens[i].tokenName) !== -1 || variableTypes.indexOf(this.tokens[i].tokenName) !== -1)
                { // int
                    let arrayType = this.tokens[i].tokenName;
                    i++;
                    if(this.tokens[i].tokenName === '[' && this.tokens[i+1].tokenName === ']')
                    { // int []
                        let bracketCount = 0;
                        while(this.tokens[i + 1].tokenName === '[' || this.tokens[i + 1].tokenName === ']')
                        {
                            if(this.tokens[i-1].tokenName === '[' && this.tokens[i].tokenName !== ']')
                            {
                                return i;
                            }
                            bracketCount++;
                            i++;
                        }
                        if(this.tokens[i].tokenType === 'identifier')
                        { // int [] x
                            i++;
                            if(this.tokens[i].tokenName === ';')
                            { // int [] x;
                                return -1;
                            }
                            else if(this.tokens[i].tokenName === '=')
                            { // int [] x =
                                i++;
                                if(this.tokens[i].tokenName === 'new')
                                { // int [] x = new
                                    i++;
                                    if(this.tokens[i].tokenName === arrayType)
                                    { // int [] x = new int
                                        i++
                                        if(this.tokens[i].tokenName === '[')
                                        {
                                            for(let x = 0; x < bracketCount/2; x++)
                                            {
                                                if(this.tokens[i].tokenName === '[')
                                                { // int [] x = new int [
                                                    i++;
                                                }
                                                else
                                                {
                                                    return i;
                                                }
                                                while(this.tokens[i].tokenName !== ']')
                                                { // int [] x = new int [10
                                                    const opperationArray = [];
                                                    opperationArray.push(this.tokens[i].tokenName);
                                                    i++;
                                                }
                                                if(!opperationCheck(arrayType, opperationArray))
                                                {
                                                    return i;
                                                }
                                                if(this.tokens[i].tokenName === ']')
                                                { // int [] x = new int [10]
                                                    i++;
                                                }
                                                else
                                                {
                                                    return i;
                                                }
                                            }
                                            if(this.tokens[i].tokenName === ';')
                                            { // int [] x = new int [10];
                                                return -1;
                                            }
                                        }
                                        else if(this.tokens[i].tokenName === '{')
                                        { // int [] x = new int {
                                            for(let x = 0; x < bracketCount/2; x++)
                                            {
                                                if(this.tokens[i].tokenName === '{')
                                                {
                                                    i++;
                                                }
                                                else
                                                {
                                                    return i;
                                                }
                                            }
                                            for(let x = 0; x < bracketCount/2; x++)
                                            {
                                                i++;
                                                while(this.tokens[i].tokenName !== '}')
                                                {
                                                    const opperationArray = [];
                                                    while(this.tokens[i].tokenName !== ',' && this.tokens[i].tokenName !== '}')
                                                    {
                                                        opperationArray.push(this.tokens[i].tokenName);
                                                        i++;
                                                    }
                                                    if(this.tokens[i + 1].tokenName === '{')
                                                    {
                                                        x--;
                                                    }
                                                    if(!opperationCheck(arrayType, opperationArray));
                                                    {
                                                        return i;
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            return i;
                                        }
                                    }
                                    else 
                                    {
                                        return i;
                                    }
                                }
                                else
                                {
                                    return i;
                                }
                            }
                            else
                            {
                                return i;
                            }
                        }
                        else
                        {
                            return i;
                        }
                    }
                    else if(this.tokens[i].tokenType === 'identifier')
                    { // int x
                        if(this.tokens[i].tokenName === '[' && this.tokens[i+1].tokenName === ']')
                        { // int x []
                            let bracketCount = 0;
                            while(this.tokens[i + 1].tokenName === '[' || this.tokens[i + 1].tokenName === ']')
                            {
                                if(this.tokens[i-1].tokenName === '[' && this.tokens[i].tokenName !== ']')
                                {
                                    return i;
                                }
                                bracketCount++;
                                i++;
                            }
                            if(this.tokens[i].tokenName === ';')
                            { // int x [];
                                return -1;
                            }
                            else if(this.tokens[i].tokenName === '=')
                            { // int x [] =
                                i++;
                                if(this.tokens[i].tokenName === 'new')
                                { // int x [] = new
                                    i++;
                                    if(this.tokens[i].tokenName === arrayType)
                                    { // int x [] = new int
                                        i++
                                        if(this.tokens[i].tokenName === '[')
                                        {
                                            for(let x = 0; x < bracketCount/2; x++)
                                            {
                                                if(this.tokens[i].tokenName === '[')
                                                { // int x [] = new int [
                                                    i++;
                                                }
                                                else
                                                {
                                                    return i;
                                                }
                                                while(this.tokens[i].tokenName !== ']')
                                                { // int x [] = new int [10
                                                    const opperationArray = [];
                                                    opperationArray.push(this.tokens[i].tokenName);
                                                    i++;
                                                }
                                                if(!opperationCheck(arrayType, opperationArray))
                                                {
                                                    return i;
                                                }
                                                if(this.tokens[i].tokenName === ']')
                                                { // int x [] = new int [10]
                                                    i++;
                                                }
                                                else
                                                {
                                                    return i;
                                                }
                                            }
                                            if(this.tokens[i].tokenName === ';')
                                            { // int x [] = new int [10];
                                                return -1;
                                            }
                                        }
                                        else if(this.tokens[i].tokenName === '{')
                                        { // int x [] = new int {
                                            for(let x = 0; x < bracketCount/2; x++)
                                            {
                                                if(this.tokens[i].tokenName === '{')
                                                {
                                                    i++;
                                                }
                                                else
                                                {
                                                    return i;
                                                }
                                            }
                                            for(let x = 0; x < bracketCount/2; x++)
                                            {
                                                i++;
                                                while(this.tokens[i].tokenName !== '}')
                                                {
                                                    const opperationArray = [];
                                                    while(this.tokens[i].tokenName !== ',' && this.tokens[i].tokenName !== '}')
                                                    {
                                                        opperationArray.push(this.tokens[i].tokenName);
                                                        i++;
                                                    }
                                                    if(this.tokens[i + 1].tokenName === '{')
                                                    {
                                                        x--;
                                                    }
                                                    if(!opperationCheck(arrayType, opperationArray));
                                                    {
                                                        return i;
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            return i;
                                        }
                                    }
                                    else 
                                    {
                                        return i;
                                    }
                                }
                                else
                                {
                                    return i;
                                }
                            }
                            else
                            {
                                return i;
                            }
                        }
                        else
                        {
                            return i;
                        }
                    }
                    else
                    {
                        return i;
                    }
                }
                else
                {
                    return i;
                }
            }
        }
    }
    /**
     * 
     * @param {Statement} statement
     * @param {int} i 
     * @returns {int} errorIndex 
     */
     ArrayParserSpaceSaver(statement, i)
     {
         if(this.knownObjects.indexOf(this.tokens[i].tokenName) !== -1 || variableTypes.indexOf(this.tokens[i].tokenName) !== -1)
         { // int
             let arrayType = this.tokens[i].tokenName;
             i++;
             if(this.tokens[i].tokenName === '[' && this.tokens[i+1].tokenName === ']')
             { // int []
                 let bracketCount = 0;
                 while(this.tokens[i + 1].tokenName === '[' || this.tokens[i + 1].tokenName === ']')
                 {
                     if(this.tokens[i-1].tokenName === '[' && this.tokens[i].tokenName !== ']')
                     {
                         return i;
                     }
                     bracketCount++;
                     i++;
                 }
                 if(this.tokens[i].tokenType === 'identifier')
                 { // int [] x
                     i++;
                     if(this.tokens[i].tokenName === ';')
                     { // int [] x;
                         return -1;
                     }
                     else if(this.tokens[i].tokenName === '=')
                     { // int [] x =
                         i++;
                         if(this.tokens[i].tokenName === 'new')
                         { // int [] x = new
                             i++;
                             if(this.tokens[i].tokenName === arrayType)
                             { // int [] x = new int
                                 i++
                                 if(this.tokens[i].tokenName === '[')
                                 {
                                     for(let x = 0; x < bracketCount/2; x++)
                                     {
                                         if(this.tokens[i].tokenName === '[')
                                         { // int [] x = new int [
                                             i++;
                                         }
                                         else
                                         {
                                             return i;
                                         }
                                         while(this.tokens[i].tokenName !== ']')
                                         { // int [] x = new int [10
                                             const opperationArray = [];
                                             opperationArray.push(this.tokens[i].tokenName);
                                             i++;
                                         }
                                         if(!opperationCheck(arrayType, opperationArray))
                                         {
                                             return i;
                                         }
                                         if(this.tokens[i].tokenName === ']')
                                         { // int [] x = new int [10]
                                             i++;
                                         }
                                         else
                                         {
                                             return i;
                                         }
                                     }
                                     if(this.tokens[i].tokenName === ';')
                                     { // int [] x = new int [10];
                                         return -1;
                                     }
                                 }
                                 else if(this.tokens[i].tokenName === '{')
                                 { // int [] x = new int {
                                     for(let x = 0; x < bracketCount/2; x++)
                                     {
                                         if(this.tokens[i].tokenName === '{')
                                         {
                                             i++;
                                         }
                                         else
                                         {
                                             return i;
                                         }
                                     }
                                     for(let x = 0; x < bracketCount/2; x++)
                                     {
                                         i++;
                                         while(this.tokens[i].tokenName !== '}')
                                         {
                                             const opperationArray = [];
                                             while(this.tokens[i].tokenName !== ',' && this.tokens[i].tokenName !== '}')
                                             {
                                                 opperationArray.push(this.tokens[i].tokenName);
                                                 i++;
                                             }
                                             if(this.tokens[i + 1].tokenName === '{')
                                             {
                                                 x--;
                                             }
                                             if(!opperationCheck(arrayType, opperationArray));
                                             {
                                                 return i;
                                             }
                                         }
                                     }
                                 }
                                 else
                                 {
                                     return i;
                                 }
                             }
                             else 
                             {
                                 return i;
                             }
                         }
                         else
                         {
                             return i;
                         }
                     }
                     else
                     {
                         return i;
                     }
                 }
                 else
                 {
                     return i;
                 }
             }
             else if(this.tokens[i].tokenType === 'identifier')
             { // int x
                 if(this.tokens[i].tokenName === '[' && this.tokens[i+1].tokenName === ']')
                 { // int x []
                     let bracketCount = 0;
                     while(this.tokens[i + 1].tokenName === '[' || this.tokens[i + 1].tokenName === ']')
                     {
                         if(this.tokens[i-1].tokenName === '[' && this.tokens[i].tokenName !== ']')
                         {
                             return i;
                         }
                         bracketCount++;
                         i++;
                     }
                     if(this.tokens[i].tokenName === ';')
                     { // int x [];
                         return -1;
                     }
                     else if(this.tokens[i].tokenName === '=')
                     { // int x [] =
                         i++;
                         if(this.tokens[i].tokenName === 'new')
                         { // int x [] = new
                             i++;
                             if(this.tokens[i].tokenName === arrayType)
                             { // int x [] = new int
                                 i++
                                 if(this.tokens[i].tokenName === '[')
                                 {
                                     for(let x = 0; x < bracketCount/2; x++)
                                     {
                                         if(this.tokens[i].tokenName === '[')
                                         { // int x [] = new int [
                                             i++;
                                         }
                                         else
                                         {
                                             return i;
                                         }
                                         while(this.tokens[i].tokenName !== ']')
                                         { // int x [] = new int [10
                                             const opperationArray = [];
                                             opperationArray.push(this.tokens[i].tokenName);
                                             i++;
                                         }
                                         if(!opperationCheck(arrayType, opperationArray))
                                         {
                                             return i;
                                         }
                                         if(this.tokens[i].tokenName === ']')
                                         { // int x [] = new int [10]
                                             i++;
                                         }
                                         else
                                         {
                                             return i;
                                         }
                                     }
                                     if(this.tokens[i].tokenName === ';')
                                     { // int x [] = new int [10];
                                         return -1;
                                     }
                                 }
                                 else if(this.tokens[i].tokenName === '{')
                                 { // int x [] = new int {
                                     for(let x = 0; x < bracketCount/2; x++)
                                     {
                                         if(this.tokens[i].tokenName === '{')
                                         {
                                             i++;
                                         }
                                         else
                                         {
                                             return i;
                                         }
                                     }
                                     for(let x = 0; x < bracketCount/2; x++)
                                     {
                                         i++;
                                         while(this.tokens[i].tokenName !== '}')
                                         {
                                             const opperationArray = [];
                                             while(this.tokens[i].tokenName !== ',' && this.tokens[i].tokenName !== '}')
                                             {
                                                 opperationArray.push(this.tokens[i].tokenName);
                                                 i++;
                                             }
                                             if(this.tokens[i + 1].tokenName === '{')
                                             {
                                                 x--;
                                             }
                                             if(!opperationCheck(arrayType, opperationArray));
                                             {
                                                 return i;
                                             }
                                         }
                                     }
                                 }
                                 else
                                 {
                                     return i;
                                 }
                             }
                             else 
                             {
                                 return i;
                             }
                         }
                         else
                         {
                             return i;
                         }
                     }
                     else
                     {
                         return i;
                     }
                 }
                 else
                 {
                     return i;
                 }
             }
             else
             {
                 return i;
             }
         }
         else
         {
             return i;
         }
     }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    ClassParser(statement)
    {
        const access = ['public', 'private', 'protected'];
        let i = statment.startIndex; // index of the statement within tokens
        while(i < statement.endIndex)
        {
            if(access.indexOf(this.tokens[i].tokenName) !== -1)
            { // public
                i++;
                if(this.tokens[i].tokenName === 'class' || this.tokens[i].tokenName === 'interface')
                { // public class
                    i++;
                    if(this.tokens[i].tokenType === 'identifier')
                    { // public class Name
                        i++;
                        if(this.tokens[i].tokenName === 'extends')
                        { // public class Name extends
                            i++;
                            if(this.classes.indexOf(this.tokens[i].tokenName) !== -1)
                            { // public class Name extends Object
                                return -1;
                            }
                            else
                            { // public class Name extends $
                                return i;
                            }
                        }
                        else
                        { //public class Name
                            if(i === statment.endIndex)
                            {
                                return -1;
                            }
                            else
                            { //public class Name $
                                return i;
                            }
                        }
                    }
                    else
                    { // public class $
                        return i;
                    }
                }
                else
                { // public $
                    return i;
                }
            }
            else
            {
                if(this.tokens[i].tokenName === 'class' || this.tokens[i].tokenName === 'interface')
                { // class
                    i++;
                    if(this.tokens[i].tokenType === 'identifier')
                    { // class Name
                        i++;
                        if(this.tokens[i].tokenName === 'extends')
                        { // class Name extends
                            i++;
                            if(this.classes.indexOf(this.tokens[i].tokenName) !== -1)
                            { // class Name extends Object
                                return -1;
                            }
                            else
                            { // class Name extends $
                                return i;
                            }
                        }
                        else
                        { //class Name
                            if(i === statment.endIndex)
                            {
                                return -1;
                            }
                            else
                            { //class Name $
                                return i;
                            }
                        }
                    }
                    else
                    { // class $
                        return i;
                    }
                }
                else
                { // $
                    return i;
                }
            }
            i++;
        }
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    ImportParser(statement)
    {
        let i = statement.startIndex; // index of the statement within tokens
        while(i < statement.endIndex)
        {
            if(this.tokens[i].tokenName === 'import')
            { // import
                i++;
                for(let x = 0; x < this.classes.length; x++) // Loop through all classes
                {
                    if(this.tokens[x].tokenName === this.classes[x].className && this.classes[x].Packages.length === 1) // check to see if the neccessary packages are just the class name which is supposed to be the last index of packages
                    { // import Object
                        i++;
                        if(this.tokens[i].tokenName === ';')
                        { // import Object;
                            return -1;
                        }
                        else
                        { // import Object$
                            return i;
                        }
                    }
                }
                 // import java
                i++;
                for(let w = 0; w < this.classes.length; w++) // Looping through all classes in classes
                {
                    let x = i;
                    for(let v = 0; v < this.classes[w].Packages.length; v++) // Looping through all packages in classes 
                    {
                        if(this.tokens[x].tokenName === this.classes[w].Packages[v]) // If the token we are on matches with the package found in packages in classes array
                        {
                            x++;
                            if(this.tokens[x].tokenName === '.')
                            {
                                x++;
                            }
                            else if(this.tokens[x].tokenName === ';' && v === this.classes[w].Packages.length-1)
                            {
                                return -1; // Ending if we find a semicolon ending the statement and we have gone through all the packages of a class
                            }
                            else
                            {
                                break
                            }
                        }
                        else
                        {
                            break;
                        }
                    }
                }
                return i; // Doesn't work if we couldn't find the packages in the order given
            }
        }
        
    }
    
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    ForParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    MethodParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    ReturnParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    MethodCallParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    SwitchParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    CaseParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    BreakParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    WhileParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    DoParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    TryParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    ObjectParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
     AssignmentParser(statement)
     {
         
     }
     /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
    IfParser(statement)
    {
        
    }
    /**
     * @param {Statement} statement
     * @returns {int} errorIndex
     */
     CatchParser(statement)
     {
         
     }
    /**
     * 
     * @returns {int} indexOfError
     */
    VariableParser() 
    {
        const seperators = [' ', 'Φ', '(', ')', '{', '}', '[', ']', '.', ';'];
        const opperators = ['=' , '+' , '-' , '/' , '%' , '+=' , '-=' , '/=' , '*=' , '%=' , '==' , '<' , '>' , '<=' , '>=' , '++' , '--'];
        const keywords = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte' , 'for' , 'while' , 'if' , 'else' , 'class' , 'final' , 'protected' , 'public' , 'private' , 'static' , 'void' , 'return' , 'switch' , 'case' , 'this' , 'boolean' , 'main' , 'args', 'import', 'extends'];
        const variableTypes = ['int' , 'double' , 'float' , 'long' , 'String' , 'char' , 'byte', 'boolean', 'short']; // Subsection of keywords
        const numberVariables = ['int' , 'double' , 'float' , 'long' , 'byte'];
        //Need to figure out how to work on scoping later. Maybe an array of arrays that can append a new one on as a new scope is created?
        const variablesDeclared = []; // This is an array to store all declared variables.
        let index = 0;
        while(index < tokens.length)
        {
            let tokenHolder = tokens[this.index]; // A variable to hold the starting token of a statement.
            if(tokenHolder.tokenType === "keyword") // If the current token is a keyword
            {
                if(variableTypes.indexOf(tokenHolder.tokenName) !== -1) // If it starts with a variable type
                {
                    index++;
                    if(!(variablesDeclared.indexOf(tokens[this.index].tokenName) !== -1)) // If it's not a previously declared identifier
                    {
                        index++;
                        if(tokens[this.index].tokenName === '=')
                        {
                            index++;
                            if(numberVariables.indexOf(tokenHolder.tokenName) != -1) // If there is a number type of variable being declared
                            {
                                if(!isNaN(tokens[this.index].tokenName))
                                {
                                    index++;
                                    if(tokens[this.index].tokenName === ";")
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
                                if(tokens[this.index].tokenName.charAt(0) === '"' && tokens[this.index].tokenName.charAt(tokens[this.index].tokenName.length-1) === '"')
                                {
                                    index++;
                                    if(tokens[this.index].tokenName === ";")
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
                                if(tokens[this.index].tokenName === 'true' || tokes[this.index].tokenName === 'false')
                                {
                                    index++;
                                    if(tokens[this.index].tokenName === ";")
                                    {
                                        index++;
                                        if(tokens[this.index].tokenName === ";")
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
            else if((tokenHolder.tokenType === 'identifier' && !(variablesDeclared.indexOf(tokens[this.index].tokenType) !== -1))) //If the statement starts with a previously declared identifier
            {
                index++;
                 if(tokens[this.index].tokenName === '=')
                {
                    index++;
                    if(numberVariables.indexOf(tokenHolder.tokenName) != -1) // If there is a number type of variable being declared
                    {
                        if(!isNaN(tokens[this.index].tokenName))
                        {
                            index++;
                            if(tokens[this.index].tokenName === ";")
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
                        if(tokens[this.index].tokenName.charAt(0) === '"' && tokens[this.index].tokenName.charAt(tokens[this.index].tokenName.length-1) === '"')
                        {
                            index++;
                            if(tokens[this.index].tokenName === ";")
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
                        if(tokens[this.index].tokenName === 'true' || tokens[this.index].tokenName === 'false')
                        {
                            index++;
                            if(tokens[this.index].tokenName === ";")
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
class Statement
{
    /**
     * @constructor
     * @param {int} startIndex
     * @param {int} endIndex
     * @param {String} statementType 
     */
     constructor(startIndex, endIndex, statementType)
     {
         this.statementType = statementType;
         this.endIndex = endIndex;
         this.startIndex = startIndex;
     }
}