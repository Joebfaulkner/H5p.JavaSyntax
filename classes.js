class classes
{
    /**
     * @constructor
     * @param {String} className
     * @param {boolean} needImport
     * @param {Array} Methods
     * @param {Array} Packages // The last index of Packages should be the class name for the import "sub-parser"'s simplicity
     */
}
class Methods
{
    /**
     * @constructor
     * @param {Array} parameters
     * @param {String} returnType
     * @param {boolean} isStatic
     */
    constructor(parameters,returnType,isStatic)
    {
        this.parameters = parameters;
        this.returnType = returnType;
        this.isStatic = isStatic;
    }
}
class parameters
{
    /**
     * @constructor
     * @param {String} paramType
     * @param {String} paramName
     */
    constructor(paramName, paramType)
    {
        this.paramName = paramName;
        this.paramType = paramType;
    }
}