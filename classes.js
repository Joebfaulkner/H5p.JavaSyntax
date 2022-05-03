class Class
{
    /**
     * @constructor
     * @param {String} className
     * @param {boolean} needImport
     * @param {Array} Methods
     * @param {Array} Packages // The last index of Packages should be the class name for the import "sub-parser"'s simplicity
     */
    constructor(className, needImport, Methods, Packages)
    {
        this.className = className;
        this.needImport = needImport;
        this.Methods = Methods;
        this.Packages = Packages;

    }
}
class Method
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
class Parameter
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